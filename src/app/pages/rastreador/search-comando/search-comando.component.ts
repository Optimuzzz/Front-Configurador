import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, map } from 'rxjs/operators';
import { RastreadorService } from '../rastreadorService/rastreadorService';
import Swal from 'sweetalert2';




@Component({
	selector: 'app-search-comando',
	templateUrl: './search-comando.component.html',
	styleUrls: ['./search-comando.component.scss']
})
export class SearchComandoComponent implements OnInit {

	breadCrumbItems!: Array<{}>;
	public paginaAtual = 1;
	public numSelect = 10;
	messageError: any;
	error: any;
	flg: any;
	comandos: any[] = [];

	constructor(
		private RastreadorService: RastreadorService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.RastreadorService.getAllComando()
			.pipe()
			.subscribe(
				(response: any) => {
					response.forEach((element: any) => {
						this.comandos.push(element);
					});


				});

		this.breadCrumbItems = [
			{ label: 'Comando' },
			{ label: 'Lista de Comando', active: true }
		];
	}

	deleteId(id: any) {
		this.RastreadorService.deleteIdComando(id)
		.pipe()
		.subscribe(
			(Data: any) => {
				if (Data) {
					this.deleteCamposId(id);
					location.reload();
				}
			},
			error => {
				this.error = error ? error : '';
				this.messageError = error.error.message;
			}
		)
	}

	deleteCamposId(id: any) {
		this.RastreadorService.deleteIdCamposComando(id)
		.pipe()
		.subscribe(
			(Data: any) => {
				if (Data) {
					this.ngOnInit();
				}
			},
			error => {
				this.error = error ? error : '';
				this.messageError = error.error.message;
			}
		)
	}


	/**
   * Confirm sweet alert
   * @param delete modal content
   */
	delete(id: any) {
		Swal.fire({
			title: 'Excluir Comando',
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
				Swal.fire('Concluído!', 'O Comando foi excluído.', 'success');
			}
		});
	}


}

