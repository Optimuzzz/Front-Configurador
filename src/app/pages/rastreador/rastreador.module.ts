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
import { SearchModeloComponent } from './search-modelo/search-modelo.component';
import { TipoComandoComponent } from './create-tipo-comando/create-tipo-comando.component';
import { SearchTipoComandoComponent } from './search-tipo-comando/search-tipo-comando.component';
import { ComandoComponent } from './create-comando/create-comando.component';
import { SearchComandoComponent } from './search-comando/search-comando.component';
import { EnvioComandoComponent } from './create-envio/create-envio.component';


@NgModule({
  declarations: [
    FabricanteComponent,
    SearchFabricanteComponent,
    ModeloComponent,
    SearchModeloComponent,
    TipoComandoComponent,
    SearchTipoComandoComponent,
    ComandoComponent,
    SearchComandoComponent,
    EnvioComandoComponent

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
