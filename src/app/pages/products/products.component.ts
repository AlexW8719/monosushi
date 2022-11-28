import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public userProducts: Array<IProductsResponse> = [];
  private _eventSubscription!: Subscription;

  constructor(
    private _productService: ProductService,
    private _actevatedRoute: ActivatedRoute,
    private _router: Router,

  ) {
    this._eventSubscription = this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadAllProducts();
      }
    })
  }

  ngOnInit(): void { }

  loadAllProducts(): void {

    const categoryName = this._actevatedRoute.snapshot.paramMap.get('category') as string;
    console.log(categoryName)
    this._productService.filterByCategoryName(categoryName).subscribe(data => {
      this.userProducts = data

    })
  }
  ngOnDestroy(): void {
    this._eventSubscription.unsubscribe();
  }
}
