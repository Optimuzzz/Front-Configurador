import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import Swal from 'sweetalert2';
import { TipoComando } from '../models/tipo-comando.models';



@Component({
  selector: 'app-search-tipo-comando',
  templateUrl: './search-tipo-comando.component.html',
  styleUrls: ['./search-tipo-comando.component.scss']
})
export class SearchTipoComandoComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  public paginaAtual = 1;
  public numSelect = 2;
  messageError: any;
  error: any;
  flg: any; 
  tipo_comandos: any[] = [];
  
  constructor(
    private RastreadorService: RastreadorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.RastreadorService.getAllTipoComando()
    .pipe()
    .subscribe(
     Data =>{
        this.tipo_comandos = Data;
    });

    this.breadCrumbItems = [
      { label: 'Tipo de Comando' },
      { label: 'Lista Tipo de Comando', active: true }
    ];
    }

    deleteId(id: any) {
      this.RastreadorService.deleteIdTipoComando(id)
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
      title: 'Excluir Tipo de Comando',
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
       
        Swal.fire('Concluído!', 'O Tipo de Comando foi excluído.', 'success');
      }
    });
  }

  
}

