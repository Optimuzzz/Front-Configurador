import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    register(user: User) {
        console.log( user );
        return this.http.post<any>(`${environment.api}/auth/signup`, user);
    }


}