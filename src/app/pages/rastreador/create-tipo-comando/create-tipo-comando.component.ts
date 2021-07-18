import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import { TipoComando } from '../models/tipo-comando.models';



@Component({
  selector: 'app-create-tipo-comando',
  templateUrl: './create-tipo-comando.component.html',
 // styleUrls: ['./create-tipo-comando.component.scss']
})
export class TipoComandoComponent implements OnInit {

  tipoComandoForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  tipo_comandos: any = [];
  id:any;
  btn:boolean = false;
  breadCrumbItems!: Array<{}>;    
  id_tipo_comando: any;
 
  
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
        this.getTipoComando(this.id);
      }
    })

    this.tipoComandoForm = this.formBuilder.group({
      id_tipo_comando: ['', Validators.required], 
      tipo_comando: ['', Validators.required],
      id_status: ['', Validators.required],     
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Tipo Comando' },
      { label: 'Cadastro Tipo de Comando', active: true }
    ];

    this.rastreadorService.getAllTipoComando()
    .pipe()
    .subscribe(
     Data =>{
        this.tipo_comandos = Data;
       
    });

  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editTipoComando(tipo_comando: TipoComando) {
    
    this.tipoComandoForm.patchValue({
      id_tipo_comando: tipo_comando.id_tipo_comando,
      tipo_comando: tipo_comando.tipo_comando,
      id_status: tipo_comando.id_status,
      observacao: tipo_comando.observacao
    });
   
  }
//PEGANDO OS DADOS DO tipo_comando NA API ATRAVES DO ID
  getTipoComando(id: any) {
    this.rastreadorService.getIdTipoComando(id).subscribe(
      (tipo_comando: TipoComando) => this.editTipoComando(tipo_comando),
      (error: any) => console.log(error)
    );
  }  

  get f() { return this.tipoComandoForm.controls; }
//CRIANDO NOVO tipo_comando
async createTipoComando() {  
    (await this.rastreadorService.createTipoComando(this.tipoComandoForm.value))
      .pipe(first())
      .subscribe(
        (data) => {         
          // this.successmsg = true;
          this.concluded();
            this.router.navigate([`/search-tipo-comando`]);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.showSpinner = false;
        });
  }

  updateTipoComando(id:any) {
    this.rastreadorService.updateTipoComando(id, this.tipoComandoForm.value)
    .pipe()
    .subscribe(
      Data => {
        if (Data) {
         
          this.concluded();
          this.router.navigate([`search-tipo-comando`]);
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
      this.updateTipoComando(this.id);
        
    } else {
        this.createTipoComando();
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
