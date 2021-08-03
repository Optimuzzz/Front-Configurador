import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from './can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class DirtycheckGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRouter: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    Nextstate: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.canDeactivate()){
        return true;
      }else {
        return confirm('Você tem alterações não salvas em seu formulário. Você quer ir para essa página?')
      }
    // return component.canDeactivate();
  }
  
}
