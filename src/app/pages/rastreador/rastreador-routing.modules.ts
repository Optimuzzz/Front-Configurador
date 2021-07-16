import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteComponent } from './create-fabricante/create-fabricante.component';
import { ModeloComponent } from './create-modelo/create-modelo.component';
import { SearchFabricanteComponent } from './search-fabricante/search-fabricante.component';

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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RastreadorRoutingModule { }

