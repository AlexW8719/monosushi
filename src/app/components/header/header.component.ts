import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductsResponse } from 'src/app/shared/interfaces/products/Products.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

import { MatDialog } from '@angular/material/dialog';

import { AuthUserDialogsComponent } from '../auth/auth-user-dialogs/auth-user-dialogs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthAdminDialogsComponent } from '../auth/auth-admin-dialogs/auth-admin-dialogs/auth-admin-dialogs.component';
import { MatMenu } from '@angular/material/menu';
import { BasketComponent } from '../basket/basket.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _basket: Array<IProductsResponse> = [];

  public totalSum = 0;
  public totalCount = 0;
  public expression = true;
  public totalBasket!: any;

  public authForm!: FormGroup;

  public switchAdmin!: boolean;
  public switchUser!: boolean;
  public switchGuest!: boolean;

  public loginSubscription!: Subscription;

  constructor(

    private _orderService: OrderService,

    private _fb: FormBuilder,
    private _accountService: AccountService,
    private _router: Router,
    private _auth: Auth,

    private _afs: Firestore,

    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    // this.initAuthFormSingIn();
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

  // initAuthFormSingIn(): void {
  //   this.authForm = this._fb.group({
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, [Validators.required,]]
  //   })
  // }

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

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  singUsers(): void {
    this.dialog.open(AuthUserDialogsComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog-style',
      autoFocus: false
    })
  }

  singAdmins(): void {
    this.dialog.open(AuthAdminDialogsComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog-style',
      autoFocus: false
    })
  }

  openBasket(): void {
    this.dialog.open(BasketComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog-style',
      autoFocus: false
    })
  }
}



