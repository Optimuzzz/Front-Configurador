import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteComponent } from './create-fabricante/create-fabricante.component';

const routes: Routes = [
  {
    path: 'search-fabricante', component: FabricanteComponent
  },
  {
    path: 'create-fabricante', component: FabricanteComponent
  },
  {
    path: 'edit-fabricante/:id', component: FabricanteComponent
  },  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RastreadorRoutingModule { }

