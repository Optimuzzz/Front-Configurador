import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ConfirmmailComponent } from './confirmmail/confirmmail.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { SteptwoverificationComponent } from './steptwoverification/steptwoverification.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'recoverpwd',
    component: RecoverpwdComponent,
  },
  {
    path: 'lockscreen',
    component: LockscreenComponent,
  },
  {
    path: 'confirm-mail',
    component: ConfirmmailComponent,
  },
  {
    path: 'email-verification',
    component: EmailverificationComponent,
  },
  {
    path: 'two-step-verification',
    component: SteptwoverificationComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
