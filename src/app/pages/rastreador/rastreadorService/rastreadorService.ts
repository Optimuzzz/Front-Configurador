import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Fabricante } from '../models/fabricante.models';
import { Modelo } from '../models/modelo.models';



@Injectable({ providedIn: 'root' })
export class RastreadorService {
    token:any;
    constructor(
        private http: HttpClient,      
        ) { }
    /***
     * Get All createFabricante==================
     */
     getAllFabricante() {

        return this.http.get<Fabricante[]>(`${environment.api}/fabricante`);
    }

    createFabricante(fabricante: Fabricante){   
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
        fabricante.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/fabricante/${id}`, fabricante );
    }

    deleteIdFabricante(id: any){
        return this.http.delete(`${environment.api}/fabricante/${id}` );
    }

 
 /***
     * Get All createModelo==================
     */

  getAllModelo() {

    return this.http.get<Fabricante[]>(`${environment.api}/modelo`);
}

createModelo(modelo: Modelo){   
    this.token = localStorage.getItem('token');
    const decoded: any = jwt_decode(this.token);
    modelo.id_login_insert = decoded.id;          

    return this.http.post<Fabricante>(`${environment.api}/modelo`, modelo);
   
}

getIdModelo(id: any){
    return this.http.get(`${environment.api}/modelo/${id}` );
}

updateModelo(id:any, modelo: Modelo){
    this.token = localStorage.getItem('token');
    const decoded: any = jwt_decode(this.token);
    modelo.id_login_update = decoded.id;
    return this.http.patch(`${environment.api}/modelo/${id}`, modelo );
}

deleteIdModelo(id: any){
    return this.http.delete(`${environment.api}/modelo/${id}` );
}

}