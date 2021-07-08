import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/account/auth/changepassword/changepassword.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SearchUserComponent } from './search-user/search-user.component';



const routes: Routes = [
  {
    path: 'search-user', component: SearchUserComponent
  },
  {
    path: 'create-user', component: CreateUserComponent
  },
  {
    path: 'edit-user/:id', component: CreateUserComponent
  },
  {
    path: 'delete-user/:id', component: SearchUserComponent
  },
  {
    path: 'my-account/:id', component: MyAccountComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

