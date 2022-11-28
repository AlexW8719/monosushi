
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { IProductsResponse } from '../../interfaces/products/Products.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductsResponse> {


  constructor(
    private _productService: ProductService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductsResponse> {
    return this._productService.getOne(Number(route.paramMap.get('id')));
  }
}
