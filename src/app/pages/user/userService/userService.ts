import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
// import { Token } from '../models/token.models';
import { User } from '../models/createUser.models';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthAuthenticationService } from 'src/app/core/services/auth.service';



@Injectable({ providedIn: 'root' })
export class UserService {

    token:any;

    constructor(
        private http: HttpClient,
        private authService: AuthAuthenticationService
    ){}


    getAll(): Observable<any> {
        
        const tokenHeader = localStorage.getItem('token');
        const headers = new HttpHeaders({
             'Authorization': `Bearer ${tokenHeader}`
            })

        return this.http.get<User[]>(`${environment.api}/user/all`, {'headers': headers});
    }

    createUser(user: User){
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        user.id_login_insert = decoded.id;
        return this.http.post<User>(`${environment.api}/user/create`, user);    
    }

    getId(id: any){
        return this.http.get(`${environment.api}/user/${id}` );
    }

    updateUser(id:any, user: User){
        this.token = localStorage.getItem('token');
        const decoded: any = jwt_decode(this.token);
        user.id_login_update = decoded.id;
        return this.http.patch(`${environment.api}/user/${id}`, user );
    }


}