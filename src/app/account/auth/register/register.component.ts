import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserProfileService } from 'src/app/core/services/user.service';

import { LAYOUT_MODE } from '../../../layouts/layouts.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register1 Component
 */
export class RegisterComponent implements OnInit {
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  registerForm!: FormGroup;
  submitted = false;
  successmsg = false;
  error: any;
  messageError: string = '';
  btnText:string = 'Cadastrar';
  showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserProfileService,
    private router: Router
    ){}

  ngOnInit(): void {

    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.btnText = 'Aguarde...';
    this.showSpinner = true;

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/account/confirm-mail']);
          }
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          this.btnText = 'Cadastrar';
          this.showSpinner = false;
        });
  }

}
