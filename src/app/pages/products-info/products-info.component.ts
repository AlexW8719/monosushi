import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss']
})
export class ProductsInfoComponent implements OnInit {

  public currentProduct!: IProductsResponse;

  constructor(
    private _productService: ProductService,
    private _orderService: OrderService,
    private _activatedRout: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.loadProduct()
    this._activatedRout.data.subscribe(response => {
      this.currentProduct = response['productInfo'];
    })
  }

  productCount(product: IProductsResponse, value: boolean): void {
    if (value) {
      ++product.count
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductsResponse): void {
    let basket: Array<IProductsResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => Number(prod.id) === Number(product.id))) {
        const INDEX = basket.findIndex(prod => prod.id === product.id);
        basket[INDEX].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }

    localStorage.setItem(`basket`, JSON.stringify(basket));
    product.count = 1;
    this._orderService.changeBasket.next(true);
  }
}
