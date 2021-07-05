import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserRoutingModule } from './user-routing.modules';
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
// import { SweetalertComponent } from './search-user/search-user.componen

@NgModule({
  declarations: [
    SearchUserComponent,
    CreateUserComponent,
    // SweetalertComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
