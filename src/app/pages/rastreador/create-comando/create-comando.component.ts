import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import { Comando } from '../models/comando.models';

@Component({
  selector: 'app-create-comando',
  templateUrl: './create-comando.component.html',
  // styleUrls: ['./create-comando.component.scss']
})
export class ComandoComponent implements OnInit {
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
  camposComando2: any;

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


    this.rastreadorService.getCamposComando(this.id).subscribe(
      (response: any) => {
        if(response){
          this.updateQuantity(response);
        }
      }
    );

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

  getSeparateComando() {
    const comandoValue = this.f.comando.value;
    const regex = /\{\{\w{1,}\}\}/g;
    this.found = comandoValue.match(regex);
    // console.log(this.found);

  }

  //PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editComando(comando: Comando) {
  //  console.log(comando);
    this.comandoForm.patchValue({
      comando: comando.comando,
      id_status: comando.id_status,
      observacao: comando.observacao,
      id_tipo_comando: comando.tipo_comando.id_tipo_comando,
      id_modelo: comando.modelo.id_modelo,
      quantities: this.fb.array([]),
    });

  }

  //PEGANDO OS DADOS DO comando NA API ATRAVES DO ID
  getComando(id: any) {
    this.rastreadorService.getIdComando(id).subscribe(
      (comando: Comando) => {
        this.editComando(comando);
      },
      (error: any) => console.log(error),
    );
  }

  //CRIANDO NOVO comando
  createComando() {
    this.rastreadorService.createComando(this.comandoForm.value)
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
    this.rastreadorService.createCamposComando(this.f.quantities.value, id_comando)
      .subscribe(
        (response: any) => {
          this.concluded();
      
        }
      )
  }

  updateCamposComando(id_comando: any){
    this.rastreadorService.updateCamposComando(this.f.quantities.value, id_comando)
      .subscribe(
        (response: any) => {
          this.concluded(); 
        }
      )
  }

  updateComando(id: any) {
    this.rastreadorService
      .updateComando(id, this.comandoForm.value)
      .pipe()
      .subscribe(
        (response: any) => {
          if (response) {
            this.updateCamposComando(id);

            this.concluded();
            this.router.navigate([`search-comando`]);
          }
        },
        (error) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
        }
      );
  }

  
	deleteUniqueCampoId(id: any) {
		this.rastreadorService.deleteUniqueCampoId(id)
			.pipe()
			.subscribe(
				Data => {
					if (Data) {
						this.ngOnInit();
					}
				},
				error => {
					this.error = error ? error : '';
					this.messageError = error.error.message;
				})

	}

  onSubmit() {
    this.submitted = true;

    if (this.id) {
      this.updateComando(this.id);
    } else {
      this.createComando();
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

  newQuantity(value: any): FormGroup {
    return this.fb.group({
      label: [''],
      campo: [value],
      tipo: [''],
      obrigatorio: false,
      id_comando_campos: ['']
    });
  }
  
  updateFormQuantity(value: any): FormGroup {
    return this.fb.group({
      label: [value.label],
      campo: [value.campo],
      tipo: [value.tipo],
      obrigatorio: value.obrigatorio,
      id_comando_campos: value.id_comando_campos
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

  addQuantity2() {
    //this.verific = false;
    this.quantities().push(this.newQuantity(''));
  }

  removeQuantity(i: number) {
    // console.log(i)
    this.quantities().removeAt(i);
  }
}
