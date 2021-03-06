import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Modelo } from '../models/modelo.models';
import { TipoComando } from '../models/tipo-comando.models';
import { Comando } from '../models/comando.models';
import { Fabricante } from '../models/fabricante.models';
import { SendModel } from '../models/sendModels';



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
        return this.http.post<Comando>(`${environment.api}/comando`, comando);

    }
    
    createCamposComando(comando: Comando, id_comando: any) {
        const { quantities } = comando;
        return this.http.post<any>(`${environment.api}/comando-campos`, {quantities, id_comando});

    }
    
    updateCamposComando(quantities:any, id_comando: any) {
        return this.http.patch<any>(`${environment.api}/comando-campos/${id_comando}`, {quantities, id_comando});
    }

    getIdComando(id: any) {
        return this.http.get(`${environment.api}/comando/${id}`);
    }

    getCamposComando(id: any) {
        return this.http.get(`${environment.api}/comando-campos/id_comando/${id}`);
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

    deleteIdCamposComando(id: any) {
        return this.http.delete(`${environment.api}/comando-campos/${id}`);
    }
    
    deleteOneIdCamposComando(id: any) {
        return this.http.delete(`${environment.api}/comando-campos/one-campo/${id}`);
    }

    deleteUniqueCampoId(id: any) {
        return this.http.delete(`${environment.api}/comando-campos/uniqueId${id}`);
    }


    /////=======// ENVIO//==============

    getAllTipoComandoEnvio(id?: any) {
        return this.http.get(`${environment.api}/comando/get/typecommand/${id}`);
    }

    getAllModeloEnvio(id?: any) {
        return this.http.get(`${environment.api}/comando/get/model/${id}`);
    }

    getComandoEnvio(id_tipo_comando: any, id_modelo: any) {
        const params = {id_tipo_comando, id_modelo}
        return this.http.get(`${environment.api}/comando/get/command/send` , {params});
    }

    getCampoComandoEnvio(id?: any) {
        return this.http.get(`${environment.api}/comando-campos/id_comando/${id}`);
    }

    sendCommandSMS(sendModel: SendModel){
        console.log(sendModel);
        return this.http.post<any>(`${environment.api}/envio`, sendModel);        
    }
/////=============================


}