import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
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

  public authForm!: FormGroup;

  public switchAdmin!: boolean;
  public switchUser!: boolean;
  public switchGuest!: boolean;

  constructor(
    private _orderService: OrderService,

    private _fb: FormBuilder,
    private _accountService: AccountService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    console.log(this.totalBasket);

    this.initAuthFormSingIn();
    this.checkUserLogin();
    this.checkUpdateLogin();
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

  initAuthFormSingIn(): void {
    this.authForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,]]
    })
  }

  login(): void {
    this._accountService.login(this.authForm.value).subscribe(data => {
      if (data && data.length > 0) {
        const USER = data[0];
        // зберігаємо USER в localStorage
        localStorage.setItem('authorizedUser', JSON.stringify(USER))
        // В залежності від ролі редиректимо
        if (USER && USER.role === ROLE.USER) {
          this._router.navigate(['/user']);
          this.switchAdmin = false;
          this.switchUser = true;
          this.switchGuest = false;

        } else if (USER && USER.role === ROLE.ADMIN) {
          this._router.navigate(['/admin']);
          this.checkUserLogin()
          this.switchAdmin = true;
          this.switchUser = false;
          this.switchGuest = false;
        }
      }
    }, (err) => {
      console.log(err)
    });
    // this.checkUserLogin()
  }

  checkUserLogin(): void {
    const CurrentUSER = JSON.parse(localStorage.getItem('authorizedUser') as string);
    if (CurrentUSER && CurrentUSER.role === ROLE.ADMIN) {
      this.switchAdmin = true;
      this.switchUser = false;
      this.switchGuest = false;
    } else if (CurrentUSER && CurrentUSER.role === ROLE.USER) {
      this.switchAdmin = false;
      this.switchUser = true;
      this.switchGuest = false;
    } else {
      this.switchAdmin = false;
      this.switchUser = false;
      this.switchGuest = true;
    }
  }

  checkUpdateLogin(): void {
    this._accountService.isAdminLogin$.subscribe(() => {
      this.checkUserLogin()
    })
    this._accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin()
    })
    this._accountService.isGuestLogin$.subscribe(() => {
      this.checkUserLogin()
    })
  }

  exit(): void {
    this._accountService.outLogin();
    this.switchAdmin = false;
    this.switchUser = false;
    this.switchGuest = true;
  }
}



