import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../../constants/role.constant';

@Injectable({
  providedIn: 'root'
})
export class CabinetGuard implements CanActivate {
  constructor(
    private _router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const CurrentUSER = JSON.parse(localStorage.getItem('authorizedUser') as string);
    if (CurrentUSER && CurrentUSER.role === ROLE.USER) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }

}
