import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.models';




@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    /***
     * Get All User
     */
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /***
     * Facked User Register
     */
    register(user: User) {
        console.log( user );
        return this.http.post<any>(`${environment.api}/auth/signup`, user);
    }

    activeEmail(token: Token){
        console.log('user ' + token);
         return this.http.post<any>(`${environment.api}/auth/email-active`, token);
    }
}