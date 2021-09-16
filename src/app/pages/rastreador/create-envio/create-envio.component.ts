import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { RastreadorService } from '../rastreadorService/rastreadorService';

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
  message: any;
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
          //limpar o formulário quantities, caso mudar a pesquisa do comando
           this.quantities().clear()
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
      if(this.f.quantities.value[i].camposEnvio == undefined){
        this.f.quantities.value[i].camposEnvio = '';
      }
      this.comando = this.comando.replace(found[i], this.f.quantities.value[i].camposEnvio);
    }

    const telefone: string = this.f.telefone.value;
    const comando: string = this.comando
    const id_modelo: number = parseInt(this.f.id_modelo.value);
    const id_tipo_comando: number = parseInt(this.f.id_tipo_comando.value);

    
    const token: any = localStorage.getItem('token');
    const decoded: any = jwt_decode(token);
    const id_usuario: number = decoded.id; 

    this.rastreadorService.sendCommandSMS({telefone, comando, id_modelo, id_tipo_comando, id_usuario})
    .subscribe(
      (response: any) => {
        if(response){
          console.log()
          if(response.results[0].status == 0){
            this.concluded();
          }else{
            this.message = "Comando não enviado!!!";
          }
        }
      }
    )
  }

  concluded() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comando enviado com sucesso!',
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(function () {
      location.reload()
  }, 800);
  }
}
