import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/Discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public userDiscounts: Array<IDiscountResponse> = [];
  constructor(
    private _discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.loadAllDiscounts();
  }

  loadAllDiscounts(): void {
    this._discountService.getAll().subscribe(data => {
      this.userDiscounts = data;
    })
  }
}
