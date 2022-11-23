import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductsRequest, IProductsResponse } from '../../interfaces/products/Products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = environment.Backend_URL;
  private _api = {
    products: `${this._url}/products`,
  }

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<IProductsResponse[]> {
    return this._http.get<IProductsResponse[]>(this._api.products)
  }

  getOne(id: number): Observable<IProductsResponse> {
    return this._http.get<IProductsResponse>(`${this._api.products}/${id}`)
  }

  create(product: IProductsRequest): Observable<IProductsResponse[]> {
    return this._http.post<IProductsResponse[]>(this._api.products, product)
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._api.products}/${id}`);
  }

  update(product: IProductsRequest, id: number): Observable<IProductsResponse> {
    return this._http.patch<IProductsResponse>(`${this._api.products}/${id}`, product);
  }

  filterByCategoryName(category: string): void {
    this._http.get<IProductsRequest>(`${this._api.products}?category.path=${category}`)
  }

}
