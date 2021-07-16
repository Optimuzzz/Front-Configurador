import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map } from 'rxjs/operators';
import { Fabricante } from '../models/fabricante.models';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-search-fabricante',
  templateUrl: './search-fabricante.component.html',
  styleUrls: ['./search-fabricante.component.scss']
})
export class SearchFabricanteComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  public paginaAtual = 1;
  messageError: any;
  error: any;
  flg: any; 
  fabricantes: any[] = [];
  
  constructor(
    private RastreadorService: RastreadorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.RastreadorService.getAllFabricante()
    .pipe()
    .subscribe(
     Data =>{
        this.fabricantes = Data;
    });

    this.breadCrumbItems = [
      { label: 'Fabricantes' },
      { label: 'Lista de Fabricantes', active: true }
    ];
    }

    deleteId(id: any) {
      this.RastreadorService.deleteIdFabricante(id)
      .pipe()
      .subscribe(        
        Data => {
          if (Data){             
          }
        },
        error => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
      })
      this.ngOnInit();        
    }

    /**
   * Confirm sweet alert
   * @param delete modal content
   */
  delete(id:any) {
    Swal.fire({
      title: 'Excluir Fabricante',
      text: "Você não poderá reverter está ação",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteId(id);
        Swal.fire('Concluído!', 'O Fabricante foi excluído.', 'success');
      }
    });
  }

  
}

