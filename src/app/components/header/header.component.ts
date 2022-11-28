import { Component, OnInit } from '@angular/core';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _basket: Array<IProductsResponse> = [];

  public totalSum = 0;
  public totalCount = 0;
  public expression = true;
  public totalBasket!: any;

  constructor(
    private _orderService: OrderService,
  ) { }

  ngOnInit(): void {

    this.loadBasket();
    this.updateBasket();
    console.log(this.totalBasket)
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.totalBasket = JSON.parse(localStorage.getItem('basket') as string);
      this._basket = JSON.parse(localStorage.getItem('basket') as string);
    }

    this.getTotalSum()
  }

  getTotalSum(): void {
    this.totalSum = this._basket.reduce((totalSum: number, prod: IProductsResponse) =>
      totalSum + prod.count * prod.price, 0
    )

    this.totalCount = this._basket.reduce((totalCount: number, prod: IProductsResponse) =>
      totalCount + prod.count, 0
    )
  }

  updateBasket(): void {
    this._orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(totalBasket: any, some: boolean): void { }
}


