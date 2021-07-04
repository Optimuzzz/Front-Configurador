import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';

@Component({
  selector: 'app-steptwoverification',
  templateUrl: './steptwoverification.component.html',
  styleUrls: ['./steptwoverification.component.scss']
})

/**
 * Step-Two-Verification Component
 */
export class SteptwoverificationComponent implements OnInit {
  layout_mode!: string;
  submitted = false;
  codigoForm!: FormGroup;
  token: any;
  length: number = 0;
  maxlength:number = 0;
  error: any;
  messageError: string = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthAuthenticationService
  ){}

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }

    //Validation Set
    this.codigoForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.codigoForm.controls; }
  
  moveInput(fromTxt:any, toTxt:any){
     this.length = fromTxt.length;
     this.maxlength = fromTxt.getAttribute(this.maxlength);

    if(this.length == this.maxlength){
      toTxt.focus();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.authService.activeEmail(this.codigoForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate(['/account/email-verification']);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
      }
    );
  }
}
