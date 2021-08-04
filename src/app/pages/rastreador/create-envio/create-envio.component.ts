import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import { Comando } from '../models/comando.models';

@Component({
  selector: 'app-create-envio',
  templateUrl: './create-envio.component.html'
})
export class EnvioComandoComponent implements OnInit {
  envioForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  id: any;
  btn: boolean = false;
  breadCrumbItems!: Array<{}>;
  id_tipo_comando: any;
  id_modelo: any;
  modelos: any = [];
  countSeparator: any;
  listCampos: any[] = [];
  found: any;
  verific: boolean = false;
  camposComando: any;
  getIDCampo: any;
  allFieldsUpdate: any;
  hasUnsavedData: any;
  tipo_comandos: any = [];

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private rastreadorService: RastreadorService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
   
    this.breadCrumbItems = [
      { label: 'Envio' },
      { label: 'Envio de Comando', active: true },
    ];

    this.rastreadorService
      .getAllTipoComando()
      .pipe()
      .subscribe((Data) => {
        this.tipo_comandos = Data;
      });

    this.rastreadorService
      .getAllModelo()
      .pipe()
      .subscribe((Data) => {
        this.modelos = Data;
      });
  }
  // termino do ngOnInit

  get f() {
    return this.envioForm.controls;
  }


  // function para pegar a quantidade de grupos no input comando
  getSeparateComando() {
    const comandoValue = this.f.comando.value;
    const regex = /\{\{\w{1,}\}\}/g;
    this.found = comandoValue.match(regex);
  }



  //PEGANDO OS DADOS DO comando NA API ATRAVES DO ID


  onSubmit() {

  }



  concluded() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ação concluída com Sucesso!',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate([`/search-comando`]);
  }




}
