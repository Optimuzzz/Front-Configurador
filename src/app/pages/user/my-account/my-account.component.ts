import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userService/userService';
import Swal from 'sweetalert2';
import { MyAccount } from '../models/myAccount.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  myAccountForm!: FormGroup;
  changeForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  users: any = [];
  id:any;
  btn:boolean = false;
  termo:any = '';
  breadCrumbItems!: Array<{}>;
  model: any; 
  decoded: any;
  idProfile: any;
  


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private modalService: NgbModal   
  ) { }  

 async ngOnInit() {
// PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
     // console.log(this.id);
      if (this.id) {
        this.btn = true;
        this.getUser(this.id);
      }

      const idToken:any = localStorage.getItem('token');
      this.decoded = jwt_decode(idToken);
      this.idProfile = this.decoded.id;

    })

    
    this.changeForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]     
    })


    this.myAccountForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      id_status: ['', Validators.required],
      telefone: ['', Validators.required],
      dt_nascimento: ['', Validators.required],
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Minha Conta'  },
      { label: 'Atualizar Conta', active: true }
    ];
  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editUser(MyAccount: MyAccount) {
    this.myAccountForm.patchValue({
      name: MyAccount.name,
      email: MyAccount.email,
      cpf_cnpj: MyAccount.cpf_cnpj,
      id_status: MyAccount.id_status,
      telefone: MyAccount.telefone,
      dt_nascimento: MyAccount.dt_nascimento,
      observacao: MyAccount.observacao
    });
   // console.log(MyAccount);
  }
// PEGANDO OS DADOS DO USUARIO NA API ATRAVES DO ID
  getUser(id: any) {
    this.userService.getUserAccount(id).subscribe(
      (MyAccount: MyAccount) =>{ this.editUser(MyAccount) ,
             
      (error: any) => console.log(error)
      }
    );
    
  }
  

  get f() { return this.myAccountForm.controls; }

  get u() { return this.changeForm.controls; }


  updateAccount(id:any) {
    this.userService.updateAccount(id, this.myAccountForm.value)
    .pipe()
    .subscribe(
      updateAccountData => {
        if (updateAccountData) {
          this.concluded();
          this.router.navigate([``]);
        }
      },
      error => {
        this.error = error ? error : '';
        this.messageError = error.error.message;
    })
   }

  onSubmit() {
    this.submitted = true;
    
      if (this.id) {
      this.updateAccount(this.id);
       this.termo = "Editar";
        
    }    
    
  }

  concluded() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ação concluída com Sucesso!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
   largeModal(largeDataModal: any) {
    this.messageError = '';
    this.changeForm.reset(); 
    this.modalService.open(largeDataModal, { size: 'lg', windowClass: 'modal-holder', centered: true, keyboard: false,  backdrop: 'static' });
  }

  updatePassword() {
    if(this.u.password.value === this.u.confirmPassword.value){
     
      this.userService.updatePassword(this.idProfile, this.u.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.concluded();
          this.changeForm.reset();           
          this.modalService.dismissAll();
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          }
        );
  }else{
    this.messageError = "As senhas não conferem!";
  }
   }

}
