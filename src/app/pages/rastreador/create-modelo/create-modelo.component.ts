import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';

import { Modelo } from '../models/modelo.models';
import { RastreadorService } from '../rastreadorService/rastreadorService';



@Component({
  selector: 'app-create-modelo',
  templateUrl: './create-modelo.component.html',
  styleUrls: ['./create-modelo.component.scss']
})
export class ModeloComponent implements OnInit {

  modeloForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  modelos: any = [];
  id:any;
  btn:boolean = false;
  breadCrumbItems!: Array<{}>;    
  id_fabricante: any;
  fabricantes:  any = [];
  
  constructor(
    private formBuilder: FormBuilder,    
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private rastreadorService: RastreadorService,
   
  ) { } 


  ngOnInit(): void {
// PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.btn = true;
        this.getModelo(this.id);
      }
    })

    this.modeloForm = this.formBuilder.group({
      id_fabricante: ['', Validators.required], 
      modelo: ['', Validators.required],
      id_status: ['', Validators.required],     
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Modelo' },
      { label: 'Cadastro de Modelo', active: true }
    ];

    this.rastreadorService.getAllFabricante()
    .pipe()
    .subscribe(
     Data =>{
        this.fabricantes = Data;
    });

  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editModelo(modelo: Modelo) {
    this.modeloForm.patchValue({
      id_fabricante: modelo.id_fabricante,
      modelo: modelo.modelo,
      id_status: modelo.id_status,
      observacao: modelo.observacao
    });
  }
//PEGANDO OS DADOS DO modelo NA API ATRAVES DO ID
  getModelo(id: any) {
    this.rastreadorService.getIdModelo(id).subscribe(
      (modelo: Modelo) => this.editModelo(modelo),
      (error: any) => console.log(error)
    );
  }  

  get f() { return this.modeloForm.controls; }
//CRIANDO NOVO fabricante
async createModelo() {  
    (await this.rastreadorService.createModelo(this.modeloForm.value))
      .pipe(first())
      .subscribe(
        (data) => {         
          // this.successmsg = true;
          this.concluded();
            this.router.navigate([`/search-modelo`]);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.showSpinner = false;
        });
  }

  updateModelo(id:any) {
    this.rastreadorService.updateModelo(id, this.modeloForm.value)
    .pipe()
    .subscribe(
      Data => {
        if (Data) {
         
          this.concluded();
          this.router.navigate([`search-modelo`]);
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
      this.updateModelo(this.id);
        
    } else {
        this.createModelo();
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
  }

}
