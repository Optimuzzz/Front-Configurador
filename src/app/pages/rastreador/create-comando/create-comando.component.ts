import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  comandos: any = [];
  id:any;
  btn:boolean = false;
  breadCrumbItems!: Array<{}>;    
  id_comando: any;
 
  
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
        this.getComando(this.id);
      }
    })

    this.comandoForm = this.formBuilder.group({
      id_comando: ['', Validators.required], 
      comando: ['', Validators.required],
      id_status: ['', Validators.required],     
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Comando' },
      { label: 'Cadastro de Comando', active: true }
    ];

    this.rastreadorService.getAllComando()
    .pipe()
    .subscribe(
     Data =>{
        this.comandos = Data;
       
    });

  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editComando(comando: Comando) {
    
    this.comandoForm.patchValue({
      id_comando: comando.id_comando,
      comando: comando.comando,
      id_status: comando.id_status,
      observacao: comando.observacao
    });
   
  }
//PEGANDO OS DADOS DO comando NA API ATRAVES DO ID
  getComando(id: any) {
    this.rastreadorService.getIdComando(id).subscribe(
      (comando: Comando) => this.editComando(comando),
      (error: any) => console.log(error)
    );
  }  

  get f() { return this.comandoForm.controls; }
//CRIANDO NOVO comando
async createComando() {  
    (await this.rastreadorService.createComando(this.comandoForm.value))
      .pipe(first())
      .subscribe(
        (data) => {         
          // this.successmsg = true;
          this.concluded();
            this.router.navigate([`/search-comando`]);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.showSpinner = false;
        });
  }

  updateComando(id:any) {
    this.rastreadorService.updateComando(id, this.comandoForm.value)
    .pipe()
    .subscribe(
      Data => {
        if (Data) {
         
          this.concluded();
          this.router.navigate([`search-comando`]);
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
  }

}
