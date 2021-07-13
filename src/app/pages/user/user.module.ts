import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserRoutingModule } from './user-routing.modules';
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  declarations: [
    SearchUserComponent,
    CreateUserComponent,
    MyAccountComponent
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    PipesModule,
    NgxPaginationModule
  ]
 
})
export class UserModule { }
