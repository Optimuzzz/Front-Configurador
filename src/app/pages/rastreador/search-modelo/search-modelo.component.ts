import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map } from 'rxjs/operators';
import { Modelo } from '../models/modelo.models';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-search-modelo',
  templateUrl: './search-modelo.component.html',
  styleUrls: ['./search-modelo.component.scss']
})
export class SearchModeloComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  public paginaAtual = 1;
  public numSelect = 2;
  messageError: any;
  error: any;
  flg: any; 
  modelos: any[] = [];
  
  constructor(
    private RastreadorService: RastreadorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.RastreadorService.getAllModelo()
    .pipe()
    .subscribe(
     Data =>{
        this.modelos = Data;
    });

    this.breadCrumbItems = [
      { label: 'Modelos' },
      { label: 'Lista de Modelos', active: true }
    ];
    }

    deleteId(id: any) {
      this.RastreadorService.deleteIdModelo(id)
      .pipe()
      .subscribe(        
        Data => {
          if (Data){  
            this.ngOnInit();           
          }
        },
        error => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
      })
             
    }

    /**
   * Confirm sweet alert
   * @param delete modal content
   */
  delete(id:any) {
    Swal.fire({
      title: 'Excluir Modelo',
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
       
        Swal.fire('Concluído!', 'O Modelo foi excluído.', 'success');
      }
    });
  }

  
}

