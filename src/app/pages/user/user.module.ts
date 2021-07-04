import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserRoutingModule } from './user-routing.modules';
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    SearchUserComponent,
    CreateUserComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class UserModule { }
