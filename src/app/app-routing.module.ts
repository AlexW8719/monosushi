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



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discouts', component: DiscountComponent },
  { path: 'discount-info/:id', component: DiscountInfoComponent },
  { path: 'delivery-and-payments', component: DeliveryPaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'products-info/:path', component: ProductsInfoComponent },

  {
    path: 'admin', component: AdminComponent, children: [
      { path: '-discounts', component: AdminDiscountComponent },
      { path: 'catecory', component: AdminCategoryComponent },
      { path: 'products-adm', component: AdminProductComponent },
      { path: 'orders', component: AdminOrderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
