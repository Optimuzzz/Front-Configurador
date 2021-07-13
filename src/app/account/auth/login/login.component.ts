import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

import { LAYOUT_MODE } from '../../../layouts/layouts.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  loginForm!: FormGroup;
  submitted = false;
  error: any | null;
  messageError: string = '';
  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthAuthenticationService,
  ){}
  
  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
   
  /**
  * Bootsrap validation form submit method
  */
  onSubmit() {
      this.submitted = true;

      this.authService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            if(data == false){
				Swal.fire('Sua Senha foi Resetada! Verifique sua caixa de Email e siga as instruções');	       
            }else{
              this.router.navigate(['']);
            }
            
          },
          (error: any) => {
            this.error = error ? error : '';
            this.messageError = error.error.message;
            }
          );
  }

}
