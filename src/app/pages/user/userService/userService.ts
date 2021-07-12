import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/createUser.models';
import jwt_decode from 'jwt-decode';
import { MyAccount } from '../models/myAccount.models';
import { UpdatePassword } from '../models/updatePassword.models';


@Injectable({ providedIn: 'root' })
export class UserService {
    token:any;
    constructor(
        private http: HttpClient,      
        ) { }
    /***
     * Get All User
     */
    getAll() {

        return this.http.get<User[]>(`${environment.api}/user/all`);
    }

    // getAll() {
    //     const token = this.authService.currentUserValue;
    //     const header = new HttpHeaders({
    //         'Authorization': `Bearer ${token}`
    //     })
    //     return this.http.get<User[]>(`${environment.api}/user/all`, {'headers': header});
    // }

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
        user.id_login_insert = decoded.id;
        return this.http.patch(`${environment.api}/user/${id}`, user );
    }

    deleteId(id: any){
        return this.http.delete(`${environment.api}/user/${id}` );
    }

    resetPassword(email: any){
        return this.http.post(`${environment.api}/auth/reset-password`, {email});
    }

    getUserAccount(id: any){
        return this.http.get(`${environment.api}/auth/${id}` );
    }
    
    updateAccount(id:any, myAccount: MyAccount){
    return this.http.patch(`${environment.api}/auth/${id}`, myAccount );
    }

    updatePassword (id:any, password: UpdatePassword){
         
    return this.http.post<any>(`${environment.api}/auth/change-password`, {id, password});
    }


    

}