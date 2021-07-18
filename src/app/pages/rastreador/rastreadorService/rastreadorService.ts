import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Fabricante } from '../models/fabricante.models';
import { Modelo } from '../models/modelo.models';
import { TipoComando } from '../models/tipo-comando.models';
import { Comando } from '../models/comando.models';



@Injectable({ providedIn: 'root' })
export class RastreadorService {
    token: any;
    constructor(
        private http: HttpClient,
    ) { }
    /***
     * Get All createFabricante==================
     */
    getAllFabricante() {

        return this.http.get<Fabricante[]>(`${environment.api}/fabricante`);
    }

    createFabricante(fabricante: Fabricante) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        fabricante.id_login_insert = decoded.id;

        return this.http.post<Fabricante>(`${environment.api}/fabricante`, fabricante);

    }

    getId(id: any) {
        return this.http.get(`${environment.api}/fabricante/${id}`);
    }

    updateFabricante(id: any, fabricante: Fabricante) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        fabricante.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/fabricante/${id}`, fabricante);
    }

    deleteIdFabricante(id: any) {
        return this.http.delete(`${environment.api}/fabricante/${id}`);
    }


    /***
        * Get All createModelo==================
        */

    getAllModelo() {

        return this.http.get<Fabricante[]>(`${environment.api}/modelo`);
    }

    createModelo(modelo: Modelo) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        modelo.id_login_insert = decoded.id;

        return this.http.post<Fabricante>(`${environment.api}/modelo`, modelo);

    }

    getIdModelo(id: any) {
        return this.http.get(`${environment.api}/modelo/${id}`);
    }

    updateModelo(id: any, modelo: Modelo) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        modelo.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/modelo/${id}`, modelo);
    }

    deleteIdModelo(id: any) {
        return this.http.delete(`${environment.api}/modelo/${id}`);
    }

    /***
        * Get All tipo comando==================
        */

    getAllTipoComando() {

        return this.http.get<Fabricante[]>(`${environment.api}/tipo-comando`);
    }

    createTipoComando(tipo_comando: TipoComando) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        tipo_comando.id_login_insert = decoded.id;

        return this.http.post<TipoComando>(`${environment.api}/tipo-comando`, tipo_comando);

    }

    getIdTipoComando(id: any) {
        return this.http.get(`${environment.api}/tipo-comando/${id}`);
    }

    updateTipoComando(id: any, tipo_comando: TipoComando) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        tipo_comando.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/tipo-comando/${id}`, tipo_comando);
    }

    deleteIdTipoComando(id: any) {
        return this.http.delete(`${environment.api}/tipo-comando/${id}`);
    }

    /***
        * Get All comando==================
        */

    getAllComando() {

        return this.http.get<Fabricante[]>(`${environment.api}/comando`);
    }

    createComando(comando: Comando) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        comando.id_login_insert = decoded.id;
            console.log(comando);
        return this.http.post<Comando>(`${environment.api}/comando`, comando);

    }

    getIdComando(id: any) {
        return this.http.get(`${environment.api}/comando/${id}`);
    }

    updateComando(id: any, comando: Comando) {
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        comando.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/comando/${id}`, comando);
    }

    deleteIdComando(id: any) {
        return this.http.delete(`${environment.api}/comando/${id}`);
    }

}