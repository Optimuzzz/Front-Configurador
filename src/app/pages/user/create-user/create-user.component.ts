import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/createUser.models';
import { UserService } from '../userService/userService';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any;
  users: any = [];
  id:any;
  btn:boolean = false;
  termo:any = '';
  breadCrumbItems!: Array<{}>;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }


  ngOnInit(): void {
// PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.btn = true;
        this.getUser(this.id);
      }
    })

    this.createUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      id_status: ['', Validators.required],
      id_tipo_usuario: ['', Validators.required],
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Usuários' },
      { label: 'Cadastro de Usuários', active: true }
    ];
  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editUser(user: User) {
    this.createUserForm.patchValue({
      name: user.name,
      email: user.email,
      login: user.login,
      password: user.password,
      cpf_cnpj: user.cpf_cnpj,
      id_status: user.id_status,
      id_tipo_usuario: user.id_tipo_usuario,
      observacao: user.observacao
    });
  }
// PEGANDO OS DADOS DO USUARIO NA API ATRAVES DO ID
  getUser(id: any) {
    this.userService.getId(id).subscribe(
      (user: User) => this.editUser(user),
      (error: any) => console.log(error)
    );
  }


  

  // get f() { return this.createUserForm.controls; }
// CRIANDO NOVO USUARIO
async createUser() {  
    (await this.userService.createUser(this.createUserForm.value))
      .pipe(first())
      .subscribe(
        ([data, data2]) => {
          console.log(data, data2)
          // this.successmsg = true;
          this.concluded();
            this.router.navigate([`user/search-user`]);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.btnText = 'Cadastrar';
          // this.showSpinner = false;
        });
  }

  updateUser(id:any) {
    this.userService.updateUser(id, this.createUserForm.value)
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
