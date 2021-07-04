import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  async login(user: any){
    const result  = await this.http.post<any>(`${environment.api}/auth/signin`, user).toPromise();
  }
}