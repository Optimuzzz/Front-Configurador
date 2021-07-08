import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

/**
 * Recover-Password1 Component
 */
export class ResetpasswordComponent implements OnInit {
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
 
  submitted = false;
  error: any;
  messageError: string = '';
  btnText: string = 'Cadastrar';
  showSpinner = false;
  id: any;


  constructor(
   
    private authService: AuthAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

 

  onSubmit() {
    this.submitted = true;
    this.btnText = 'Enviando...';
    this.showSpinner = true;

    this.authService.resetPassword(this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.successmsg();
          this.router.navigate(['account/login']);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          this.btnText = 'Confirmar';
          this.showSpinner = false;
        }
      );

    //this.router.navigate(['']);
  }

  successmsg() {
    Swal.fire('Reset de senha Concluído!', 'O usuário receberá uma mensagem com instruções para resetar a senha', 'success');
  }

}