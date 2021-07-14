import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Fabricante } from '../models/Fabricante.models';


@Injectable({ providedIn: 'root' })
export class RastreadorService {
    token:any;
    constructor(
        private http: HttpClient,      
        ) { }
    /***
     * Get All createFabricante
     */
    getAll() {

        return this.http.get<Fabricante[]>(`${environment.api}/fabricante/all`);
    }

    createFabricante(fabricante: Fabricante){
        console.log(fabricante);     
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        fabricante.id_login_insert = decoded.id;          

        return this.http.post<Fabricante>(`${environment.api}/fabricante`, fabricante);
       
    }

    getId(id: any){
        return this.http.get(`${environment.api}/fabricante/${id}` );
    }

    updateFabricante(id:any, fabricante: Fabricante){
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        fabricante.id_fabricante = decoded.id;
        return this.http.patch(`${environment.api}/fabricante/${id}`, fabricante );
    }

    deleteId(id: any){
        return this.http.delete(`${environment.api}/fabricante/${id}` );
    }

 


    

}