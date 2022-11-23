import { Component, OnInit } from '@angular/core';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public userProducts: Array<IProductsResponse> = [];
  constructor(
    private _productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this._productService.getAll().subscribe(data => {
      this.userProducts = data;
    })
  }
}
