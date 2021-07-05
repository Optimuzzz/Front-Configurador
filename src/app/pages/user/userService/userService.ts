import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
// import { Token } from '../models/token.models';
import { User } from '../models/createUser.models';
import jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class UserService {
    token:any;
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll() {

        return this.http.get<User[]>(`${environment.api}/user/all`);
    }

    createUser(user: User){
     
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        user.id_login_insert = decoded.id;
        // console.log(user);
        return this.http.post<User>(`${environment.api}/user/create`, user);    
    }

    getId(id: any){
        return this.http.get(`${environment.api}/user/${id}` );
    }

    updateUser(id:any, user: User){
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        user.id_login_insert = decoded.id;
        // console.log(id, user);
        return this.http.patch(`${environment.api}/user/${id}`, user );
    }

    deleteId(id: any){
        return this.http.delete(`${environment.api}/user/${id}` );
    }


}