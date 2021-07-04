import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }