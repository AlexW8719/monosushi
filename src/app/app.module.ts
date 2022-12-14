import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsInfoComponent } from './pages/products-info/products-info.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { AboutComponent } from './pages/about/about.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';


import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { AuthUserDialogsComponent } from './components/auth/auth-user-dialogs/auth-user-dialogs.component';
import { AuthAdminDialogsComponent } from './components/auth/auth-admin-dialogs/auth-admin-dialogs/auth-admin-dialogs.component';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    DiscountInfoComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductsInfoComponent,
    DeliveryPaymentComponent,
    AboutComponent,
    PrivacyComponent,
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    CabinetComponent,
    AuthUserDialogsComponent,
    AuthAdminDialogsComponent,
    BasketComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    SharedModule,

    // ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
