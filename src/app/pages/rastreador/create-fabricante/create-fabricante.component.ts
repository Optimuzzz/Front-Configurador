import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { Fabricante } from '../models/Fabricante.models';
import { RastreadorService } from '../fabricanteService/rastreadorService';

@Component({
  selector: 'app-create-fabricante',
  templateUrl: './create-fabricante.component.html',
  styleUrls: ['./create-fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

  fabricanteForm!: FormGroup;
  submitted = false;
  error: any;
  messageError: any = '';
  fabricantes: any = [];
  id:any;
  btn:boolean = false;
  termo:any = '';
  breadCrumbItems!: Array<{}>;    


  constructor(
    private formBuilder: FormBuilder,    
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private rastreadorService: RastreadorService
  ) { }
 


  ngOnInit(): void {
// PEGANDO O PARAMETRO ID ATRAVÉS DA URL
    this.activatedRouter.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.btn = true;
        this.getFabricante(this.id);
      }
    })

    this.fabricanteForm = this.formBuilder.group({
      fabricante: ['', Validators.required],
      id_status: ['', Validators.required],     
      observacao: [null]
    })

    this.breadCrumbItems = [
      { label: 'Fabricante' },
      { label: 'Cadastro de Fabricante', active: true }
    ];
  }
//PREENCHENDO DADOS NO FORMULÁRIO PARA EDITAR
  editFabricante(fabricante: Fabricante) {
    this.fabricanteForm.patchValue({
      fabricante: fabricante.fabricante,
      
      observacao: fabricante.observacao
    });
  }
//PEGANDO OS DADOS DO fabricante NA API ATRAVES DO ID
  getFabricante(id: any) {
    this.rastreadorService.getId(id).subscribe(
      (fabricante: Fabricante) => this.editFabricante(fabricante),
      (error: any) => console.log(error)
    );
  }  

  get f() { return this.fabricanteForm.controls; }
//CRIANDO NOVO fabricante
async createFabricante() {  
    (await this.rastreadorService.createFabricante(this.fabricanteForm.value))
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data)
          // this.successmsg = true;
          this.concluded();
            this.router.navigate([`/search-fabricante`]);
        },
        (error: any) => {
          this.error = error ? error : '';
          this.messageError = error.error.message;
          // this.btnText = 'Cadastrar';
          // this.showSpinner = false;
        });
  }

  updateFabricante(id:any) {
    this.rastreadorService.updateFabricante(id, this.fabricanteForm.value)
    .pipe()
    .subscribe(
      Data => {
        if (Data) {
          this.concluded();
          this.router.navigate([`search-fabricante`]);
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
      this.updateFabricante(this.id);
       this.termo = "Editar";
        
    } else {
        this.createFabricante();
        this.termo = "Cadastrar";
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
