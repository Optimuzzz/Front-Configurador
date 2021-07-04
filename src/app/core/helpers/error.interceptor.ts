// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthfakeauthenticationService } from '../services/authfake.service';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

//     constructor(
//         private auth: AuthfakeauthenticationService
//     ) {}

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(catchError(err => {
//             if (err.status === 401) {
//                 // auto logout if 401 response returned from api
//                 this.auth.logout();
//                // location.reload(true);
//             }
//             const error = err.error.message || err.statusText;
//             return throwError(error);
//         }))
//     }

//     private handleError(error: HttpErrorResponse){
//         if (error.error instanceof ErrorEvent){
//             // erro de cliente-side ou de rede
//             console.log('Ocorreu um erro:', error.error.message);
//         }else{
//             //Error retornando pelo backend
//             console.error(
//                 `Código do erro ${error.status},` +
//                 `Erro: ${JSON.stringify(error.error)}`
//             );
//         }

//         //retornar um observable com uma mensagem amigavel
//         return throwError('Ocorreu um erro, tente novamente');
//     }
// }

