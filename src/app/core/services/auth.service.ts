import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { ForgotPassword } from './forgotPassword';
import { ResetPassword } from './resetPasword';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthAuthenticationService {

    confirmEmailUrl: string = '';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * current user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        //console.log('email:' + email, 'password:' + password)
        return this.http.post<any>(`${environment.api}/auth/signin`, { email, password })

            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                try {
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token', JSON.stringify(user.token));
                        this.currentUserSubject.next(user.token);
                    }
                    return user.token;
                } catch (error) {
                    console.log('auth' + error);
                }
            }));
    }
    /**
     * Logout the user
     */
     logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['/account/login']);
        this.currentUserSubject.next(null!);
        
    }


    activeEmail(user: User){
        const { token } = user;
        return this.http.post<any>(`${environment.api}/auth/email-active`, {token});
   }

    forgotPassword(forgotPassword: ForgotPassword) {
        let headers = new HttpHeaders({
            'confirmEmailUrl': this.confirmEmailUrl
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.api}/auth/forgot-password`, forgotPassword, options);
    }

    changePassword(id: number, password: string){
       // console.log(id, password)
        return this.http.post<any>(`${environment.api}/auth/change-password`, {id, password});
    }

    verifyToken(tokenConfirm: string) {
        return this.http.post<any>(`${environment.api}/auth/verify-token`, { tokenConfirm });
    }

   resetPassword(resetPassword: ResetPassword) {
        let headers = new HttpHeaders({
            'confirmEmailUrl': this.confirmEmailUrl
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.api}/auth/reset-password`, resetPassword, options);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);

        if (decoded.exp === undefined) {
            return null as any;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    //verificando se o token estar expirado
    isTokenExpired(token?: any): boolean {
        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf());
    }

    //verificando se o usu??rio estar logado
    isUserLoggedIn(token: any) {
        if (!token) {
            return false;
        } else if (this.isTokenExpired(token)) {
            return false
        }

        return true;
    }
}
