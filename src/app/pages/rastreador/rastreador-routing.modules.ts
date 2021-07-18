import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComandoComponent } from './create-comando/create-comando.component';
import { FabricanteComponent } from './create-fabricante/create-fabricante.component';
import { ModeloComponent } from './create-modelo/create-modelo.component';
import { TipoComandoComponent } from './create-tipo-comando/create-tipo-comando.component';
import { SearchComandoComponent } from './search-comando/search-comando.component';
import { SearchFabricanteComponent } from './search-fabricante/search-fabricante.component';
import { SearchModeloComponent } from './search-modelo/search-modelo.component';
import { SearchTipoComandoComponent } from './search-tipo-comando/search-tipo-comando.component';

const routes: Routes = [
  {
    path: 'search-fabricante', component: SearchFabricanteComponent
  },
  {
    path: 'create-fabricante', component: FabricanteComponent
  },
  {
    path: 'edit-fabricante/:id', component: FabricanteComponent
  },  
  {
    path: 'create-modelo', component: ModeloComponent
  },
  {
    path: 'search-modelo', component: SearchModeloComponent
  },
  {
    path: 'edit-modelo/:id', component: ModeloComponent
  },
  {
    path: 'create-tipo-comando', component: TipoComandoComponent
  },
  {
    path: 'search-tipo-comando', component: SearchTipoComandoComponent
  },
  {
    path: 'edit-tipo-comando/:id', component: TipoComandoComponent
  },
  {
    path: 'create-comando', component: ComandoComponent
  },
  {
    path: 'search-comando', component: SearchComandoComponent
  },
  {
    path: 'edit-comando/:id', component: ComandoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RastreadorRoutingModule { }

