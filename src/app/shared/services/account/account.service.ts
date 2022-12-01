import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../../interfaces/account/Account.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _url = environment.Backend_URL;
  private _api = {
    auth: `${this._url}/auth`
  }

  public isUserLogin$ = new Subject<boolean>();
  public isAdminLogin$ = new Subject<boolean>();
  public isGuestLogin$ = new Subject<boolean>();
  public switchAdmin!: boolean;
  public switchUser!: boolean;
  public switchGuest!: boolean;


  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(credential: ILogin): Observable<any> {
    return this._http.get(`${this._api.auth}?email=${credential.email}&password=${credential.password}`)
  }

  outLogin(): void {
    this._router.navigate(['/']);
    localStorage.removeItem('authorizedUser');
    this.isAdminLogin$.next(false)
    this.isUserLogin$.next(false)
    this.isGuestLogin$.next(true)

  }
}
