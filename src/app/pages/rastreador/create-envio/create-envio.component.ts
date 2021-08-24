import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import { Comando } from '../models/comando.models';

@Component({
  selector: 'app-create-envio',
  templateUrl: './create-envio.component.html',
})
export class EnvioComandoComponent implements OnInit {
  envioForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  id: any = '';
  btn: boolean = false;
  breadCrumbItems!: Array<{}>;
  id_tipo_comando: any;
  id_modelo: any;
  modelos: any = [];
  camposComando: any;
  tipo_comandos: any = [];
  id_comando: any;
  comando: any;
  camposEnvio: string[] = [];

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private rastreadorService: RastreadorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Envio' },
      { label: 'Envio de Comando', active: true },
    ];

    this.envioForm = this.fb.group({
      id_modelo: ['', Validators.required],
      id_tipo_comando: ['', Validators.required],
      telefone: ['', Validators.required],
      comando: ['', Validators.required],
      quantities: this.fb.array([]),
    });

    this.getAllTipoComandoEnvio(this.envioForm.controls.id_modelo.value);
    this.getAllModeloEnvio(this.envioForm.controls.id_tipo_comando.value);
  }

  // termino do ngOnInit
  getAllTipoComandoEnvio(id?: any) {
    this.rastreadorService
      .getAllTipoComandoEnvio(id)
      .pipe()
      .subscribe((Data) => {
        this.tipo_comandos = Data;
        if (
          this.envioForm.controls.id_tipo_comando.value &&
          this.envioForm.controls.id_modelo.value
        ) {
          this.comandoEnvio(
            this.envioForm.controls.id_tipo_comando.value,
            this.envioForm.controls.id_modelo.value
          );
        }
      });
  }

  getAllModeloEnvio(id?: any) {
    this.rastreadorService
      .getAllModeloEnvio(id)
      .pipe()
      .subscribe((Data) => {
        this.modelos = Data;
        if (
          this.envioForm.controls.id_tipo_comando.value &&
          this.envioForm.controls.id_modelo.value
        ) {
          this.comandoEnvio(
            this.envioForm.controls.id_tipo_comando.value,
            this.envioForm.controls.id_modelo.value
          );
        }
      });
  }

  comandoEnvio(id1?: any, id2?: any) {
    if (id1 && id2) {
      this.rastreadorService
        .getComandoEnvio(id1, id2)
        .pipe()
        .subscribe((Data: any) => {
          this.id = Data[0].id_comando;
          this.comando = Data[0].comando;
          this.campoComandoEnvio(this.id);
        });
    }
  }

  campoComandoEnvio(id: any) {
    this.rastreadorService
      .getCampoComandoEnvio(id)
      .pipe()
      .subscribe((Data: any) => {
        if (Data) {
          this.camposComando = Data;
          Data.forEach((element: any) => {
            this.quantities().push(this.newQuantity(element));
          });
        }
      });
  }

  quantities(): FormArray {
    return this.envioForm.get('quantities') as FormArray;
  }

  // vai ser chamado no gerar campos na hora do cadastro
  newQuantity(value: any): FormGroup {
    return this.fb.group({
      camposEnvio: [''],
    });
  }

  get f() {
    return this.envioForm.controls;
  }

  //PEGANDO OS DADOS DO comando NA API ATRAVES DO ID

  onSubmit() {
    const value = this.f.comando.value;
    const regex = /\{\{\w{1,}\}\}/g;
    let found: any = value.match(regex);

    for (let i = 0; i < this.f.quantities.value.length; i++) {
      this.comando = this.comando.replace(found[i], this.f.quantities.value[i].camposEnvio);
    }

    const telefone = this.f.telefone.value;
    const comando = this.comando

    this.rastreadorService.sendCommandSMS({telefone, comando})
    .subscribe(
      (response: any) => {
        console.log(response.error.text);
      }
    )
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
