import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FabricanteComponent } from './create-fabricante/create-fabricante.component';
import { RastreadorRoutingModule } from './rastreador-routing.modules';
import { SearchFabricanteComponent } from './search-fabricante/search-fabricante.component';
import { ModeloComponent } from './create-modelo/create-modelo.component';


@NgModule({
  declarations: [
    FabricanteComponent,
    SearchFabricanteComponent,
    ModeloComponent


  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    PipesModule,
    NgxPaginationModule,
    RastreadorRoutingModule
  ]
 
})
export class RastreadorModule { }
