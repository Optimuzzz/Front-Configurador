import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userService/userService';
import Swal from 'sweetalert2';
import { User } from '../models/myAccount.models';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  myAccountForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any;
  users: any = [];
  id:any;
  btn:boolean = false;
  termo:any = '';
  breadCrumbItems!: Array<{}>;
  model: any;
 
  


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
   
  ) { }
 


  

 async ngOnInit() {
// PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.btn = true;
        this.getUser(this.id);
      }
    })

 

    this.myAccountForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      id_status: ['', Validators.required],
      id_tipo_usuario: ['', Validators.required],
      telefone: ['', Validators.required],
      nascimento: ['', Validators.required],
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Minha Conta'  },
      { label: 'Atualizar Conta', active: true }
    ];
  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editUser(user: User) {
    this.myAccountForm.patchValue({
      nome: user.nome,
      email: user.email,
      cpf_cnpj: user.cpf_cnpj,
      id_status: user.id_status,
      id_tipo_usuario: user.id_tipo_usuario,
      telefone: user.telefone,
      nascimento: user.nascimento,
      observacao: user.observacao
    });
  }
// PEGANDO OS DADOS DO USUARIO NA API ATRAVES DO ID
  getUser(id: any) {
    this.userService.getUserAccount(id).subscribe(
      (user: User) => this.editUser(user),
      (error: any) => console.log(error)
    );
  }


  

  // get f() { return this.createUserForm.controls; }
// CRIANDO NOVO USUARIO
  createUser() {   
    this.userService.createUser(this.myAccountForm.value)
      .pipe()
      .subscribe(
        createUserData => {
          if (createUserData) {
            this.concluded();
            this.router.navigate([`user/search-user`]);
          }
        },
        error => {
          this.error = error ? error : '';
          this.messageError = error.error.message;


        }
      )
  }

  updateUser(id:any) {
    this.userService.updateUser(id, this.myAccountForm.value)
    .pipe()
    .subscribe(
      createUserData => {
        if (createUserData) {
          this.concluded();
          this.router.navigate([`user/search-user`]);
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
      this.updateUser(this.id);
       this.termo = "Editar";
        
    } else {
        this.createUser();
        this.termo = "Cadastrar";
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

}
