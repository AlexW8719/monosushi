import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscountComponent } from './pages/discount/discount.component';
import { HomeComponent } from './pages/home/home.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component'
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductsInfoComponent } from './pages/products-info/products-info.component';
import { ProductService } from './shared/services/product/product.service';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';

import { AuthGuard } from './shared/guards/auth/auth.guard';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { CabinetGuard } from './shared/guards/user-cabinet/cabinet.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discouts', component: DiscountComponent },
  {
    path: 'discount-info/:id', component: DiscountInfoComponent, resolve: {
      discountInfo: DiscountInfoResolver
    }
  },
  { path: 'delivery-and-payments', component: DeliveryPaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products/:category', component: ProductsComponent },
  {
    path: 'products/:category/:id', component: ProductsInfoComponent, resolve: {
      productInfo: ProductInfoResolver
    }
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '-discounts', component: AdminDiscountComponent },
      { path: 'catecory', component: AdminCategoryComponent },
      { path: 'products-adm', component: AdminProductComponent },
      { path: 'orders', component: AdminOrderComponent },
    ]
  },
  {
    path: 'user', component: CabinetComponent, canActivate: [CabinetGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
