import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map } from 'rxjs/operators';
import { UserService } from '../userService/userService';
import Swal from 'sweetalert2';
import { users } from '../../dashboards/data';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  
  users:any[] = [];
  user: any = users;
  breadCrumbItems!: Array<{}>;
  public paginaAtual = 1;
  messageError: any;
  error: any;
  flg: any; 
  
  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getAll()
    .pipe()
    .subscribe(
     userData =>{
        this.users = userData;
    });

    this.breadCrumbItems = [
      { label: 'Usuários' },
      { label: 'Lista de Usuários', active: true }
    ];
    }

    deleteId(id: any) {
      this.userService.deleteId(id)
      .pipe()
      .subscribe(        
        Data => {
          if (Data){             
          }
        },
        error => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
      })
      this.ngOnInit();        
    }

    resetPw(email: any) {
      this.userService.resetPassword(email)
      .pipe()
      .subscribe(        
        Data => {
          if (Data){             
          }
        },
        error => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
      })          
    }

    /**
   * Confirm sweet alert
   * @param delete modal content
   */
  delete(id:any) {
    Swal.fire({
      title: 'Excluir Usuário',
      text: "Você não poderá reverter está ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteId(id);
        Swal.fire('Concluído!', 'Seu usuário foi excluído.', 'success');
      }
    });
  }

  resetPassword(email:any) {
    Swal.fire({
      title: 'Resetar senha de  Usuário?',
      text: "Você não poderá reverter está ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.resetPw(email);
        Swal.fire('Concluído!', 'Senha resetada com sucesso.', 'success');
      }
    });
  }
  
}

