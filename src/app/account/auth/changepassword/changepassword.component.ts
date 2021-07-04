import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserProfileService } from 'src/app/core/services/user.service';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';
import jwt_decode from 'jwt-decode';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

/**
 * Recover-Password1 Component
 */
export class ChangePasswordComponent implements OnInit {
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  changeForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: string = '';
  model: any = {};
  dateExpToken: any = '';
  verifyToken = false;
  decoded: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAuthenticationService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    ) { }

  async ngOnInit() {
    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    this.changeForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    
     this.model.tokenConfirm = await this.activeRouter.snapshot.queryParamMap.get('token');

     this.decoded = await jwt_decode(this.model.tokenConfirm);

     const date = new Date(0);

     const result = await this.authService.verifyToken(this.model.tokenConfirm)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if(data){
            if(date.setUTCSeconds(this.decoded.exp) < new Date().valueOf()){
              alert('token expirado !');
              this.router.navigate(['']);
            }
          }
        },
        (error: any) => {
          if(error){
            alert('Token Inválido');
            this.router.navigate(['']);
          }
          
        }
      );
  }


  // convenience getter for easy access to form fields
  get f() { return this.changeForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.f.password.value === this.f.confirmPassword.value){
        this.authService.changePassword(this.decoded.id, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.router.navigate(['/account/login']);
          },
          (error: any) => {
            this.error = error ? error : '';
            this.messageError = error.error.message;
            }
          );
    }else{
      this.messageError = "As senhas não conferem!";
    }

      //this.router.navigate(['']);
}

}