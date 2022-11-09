import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryResponse, ICategoryRequest } from '../../interfaces/categories/Category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url = environment.Backend_URL;
  private _api = {
    categories: `${this._url}/categories`
  }

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<ICategoryResponse[]> {
    return this._http.get<ICategoryResponse[]>(this._api.categories);
  }

  create(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this._http.post<ICategoryResponse>(this._api.categories, category)
  }

  update(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this._http.patch<ICategoryResponse>(`${this._api.categories}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._api.categories}/${id}`);
  }

}
