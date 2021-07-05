import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recoverpwd',
  templateUrl: './recoverpwd.component.html',
  styleUrls: ['./recoverpwd.component.scss']
})

/**
 * Recover-Password1 Component
 */
export class RecoverpwdComponent implements OnInit {
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  recoverForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: string = '';
  btnText: string = 'Cadastrar';
  showSpinner = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.recoverForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.btnText = 'Enviando...';
    this.showSpinner = true;

    this.authService.forgotPassword(this.recoverForm.value)
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
    Swal.fire('Email de Recuperação enviado!', 'Você receberá uma mensagem com instruções para recuperar sua conta!', 'success');
  }

}