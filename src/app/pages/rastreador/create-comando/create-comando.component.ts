import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import { Comando } from '../models/comando.models';
import { ComponentCanDeactivate } from './can-deactivate';

@Component({
  selector: 'app-create-comando',
  templateUrl: './create-comando.component.html',
  // styleUrls: ['./create-comando.component.scss']
})
export class ComandoComponent implements OnInit, ComponentCanDeactivate {
  canDeactivate(): boolean{
    return !this.isDirty;
  }

  isDirty = false;
  comandoForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  tipo_comandos: any = [];
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
  allFieldsUpdate: any

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private rastreadorService: RastreadorService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.btn = true;
        this.getComando(this.id);
      }
    });

    this.rastreadorService
      .getCamposComando(this.id)
      .subscribe((response: any) => {
        if (response) {
          this.allFieldsUpdate = response;
          this.updateQuantity(response);
        }
      });

    this.comandoForm = this.fb.group({
      id_comando: ['', Validators.required],
      comando: ['', Validators.required],
      id_status: ['1', Validators.required],
      id_modelo: ['', Validators.required],
      id_tipo_comando: ['', Validators.required],
      observacao: [null],
      quantities: this.fb.array([]),
    });

    this.breadCrumbItems = [
      { label: 'Comando' },
      { label: 'Cadastro de Comando', active: true },
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
    return this.comandoForm.controls;
  }


  // function para pegar a quantidade de grupos no input comando
  getSeparateComando() {
    const comandoValue = this.f.comando.value;
    const regex = /\{\{\w{1,}\}\}/g;
    this.found = comandoValue.match(regex);
  }

  //PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editComando(comando: Comando) {
    this.comandoForm.patchValue({
      comando: comando.comando,
      id_status: comando.id_status,
      observacao: comando.observacao,
      id_tipo_comando: comando.tipo_comando.id_tipo_comando,
      id_modelo: comando.modelo.id_modelo,
      //quantities: this.fb.array([]),
    });
  }

  //PEGANDO OS DADOS DO comando NA API ATRAVES DO ID
  getComando(id: any) {
    this.rastreadorService.getIdComando(id).subscribe(
      (comando: Comando) => {
        this.editComando(comando);
      },
      (error: any) => {

      }
    );
  }

  //CRIANDO NOVO comando
  createComando() {
    this.rastreadorService
      .createComando(this.comandoForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.successmsg = true;
          if (data != '') {
            this.createCamposComando(data.id_comando);
          }
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.showSpinner = false;
        }
      );
  }

  createCamposComando(id_comando: any) {
    this.rastreadorService
      .createCamposComando(this.comandoForm.getRawValue(), id_comando)
      .subscribe((response: any) => {
        this.concluded();
      });
  }

  updateCamposComando(id_comando: any) {
    this.rastreadorService
      .updateCamposComando(this.comandoForm.getRawValue().quantities, id_comando)
      .subscribe((response: any) => {
        this.concluded();
      });
  }

  updateComando(id: any) {

    Swal.fire({
      title: 'Atualizar Comando?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.rastreadorService
      .updateComando(id, this.comandoForm.value)
      .pipe()
      .subscribe(
        (response: any) => {
          if (response) {
            this.updateCamposComando(id);

            //this.concluded();
            this.router.navigate([`search-comando`]);
          }
        },
        (error) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
        }
      );

      }
    });
    
    
  }
// verificar se está em uso era o botão exluir campo
  deleteUniqueCampoId(id: any) {
    this.rastreadorService
      .deleteUniqueCampoId(id)
      .pipe()
      .subscribe(
        (Data) => {
          if (Data) {
            this.ngOnInit();
          }
        },
        (error) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
        }
      );
  }

  onSubmit() {
    this.submitted = true;
    let verifica = false;
    this.isDirty = false;

    if(this.found){
      if (this.found.length === this.comandoForm.getRawValue().quantities.length) {
        for (let i = 0; i < this.found.length; i++) {
          if (this.found[i] != this.comandoForm.getRawValue().quantities[i].campo) {
            this.messageError = `O valor do campo ${i + 1} não está de acordo com o seu comando`;
            verifica = true;
          }
        }
  
        if (verifica === false) {
          if (this.id) this.updateComando(this.id);
          else this.createComando();
        }
  
      } else {
        this.messageError = "A quantidade de campos não está de acordo com o seu comando!"
      }
    }else {
        this.rastreadorService.createComando(this.comandoForm.getRawValue())
        .subscribe((response: any) => {
          if(response) this.concluded();
        });
    }
    
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

  quantities(): FormArray {
    return this.comandoForm.get('quantities') as FormArray;
  }

  // vai ser chamado no gerar campos na hora do cadastro
  newQuantity(value: any): FormGroup {
    return this.fb.group({
      label: [''],
      campo: [{ value: value, disabled: true }],
      tipo: ['text'],
      obrigatorio: 1,
      id_comando_campos: [''],
    });
  }

  // vai ser chamado na hora de atualizar os campos no update
  newQuantityUpdate(value: any, campos: any): FormGroup {
    this.messageError = '';
    return this.fb.group({
      label: [value.label ? value.label : ''],
      campo: [campos],
      tipo: [value.tipo ? value.tipo : 'text'],
      obrigatorio: [value.obrigatorio ? value.obrigatorio : 0],
      id_comando_campos: [value.id_comando_campos],
    });
  }

  updateFormQuantity(value: any): FormGroup {
    this.getIDCampo = value.id_comando_campos;
    return this.fb.group({
      label: [value.label],
      campo: [value.campo],
      tipo: [value.tipo],
      obrigatorio: value.obrigatorio,
      id_comando_campos: value.id_comando_campos,
    });
  }

  updateQuantity(value: any) {
    this.verific = true;
    value.forEach((element: any) => {
      return this.quantities().push(this.updateFormQuantity(element));
    });
  }

  addQuantity() {
    this.verific = true;
    this.found.forEach((element: any) => {
      return this.quantities().push(this.newQuantity(element));
    });
  }

  // refazer os campo no update
  redoQuantity() {
    this.verific = true;
    for (let i = 0; i < this.found.length; i++) {
      if (this.allFieldsUpdate[i] == undefined) {
        this.quantities().push(this.newQuantityUpdate('', this.found[i]));
      } else {
        this.quantities().push(this.newQuantityUpdate(this.allFieldsUpdate[i], this.found[i]));
      }
    }
  }
// remove todos os campos e chama o refazer campos
  addQuantity2() {
    for (let i = this.comandoForm.getRawValue().quantities.length - 1; i >= 0; i--) {
      this.removeAllFieldQuantity(i)
    }

    this.redoQuantity();
  }

  removeAllFieldQuantity(i: number) {
    this.quantities().removeAt(i);
  }
/// verificar se está em uso
  removeOneFieldQuantity(i: number, id: number) {
    if (!this.id) {
      this.quantities().removeAt(i);
    } else {
      Swal.fire({
        title: 'Excluir Comando?',
        text: "Você não poderá reverter está ação",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.rastreadorService.deleteOneIdCamposComando(id).subscribe();
          this.quantities().removeAt(i);
          Swal.fire('Concluído!', 'O Comando foi excluído.', 'success');
        }
      });
    }
  }
}
