import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/Discount.interface';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private _url = environment.Backend_URL;
  private _api = {
    discounts: `${this._url}/discounts`,
  }



  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this._http.get<IDiscountResponse[]>(this._api.discounts)
  }

  create(discount: IDiscountRequest): Observable<IDiscountResponse[]> {
    return this._http.post<IDiscountResponse[]>(this._api.discounts, discount)
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._api.discounts}/${id}`);
  }
  update(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this._http.patch<IDiscountResponse>(`${this._api.discounts}/${id}`, discount);
  }

  getOne(id: number): Observable<IDiscountResponse> {
    return this._http.get<IDiscountResponse>(`${this._api.discounts}/${id}`);
  }
}