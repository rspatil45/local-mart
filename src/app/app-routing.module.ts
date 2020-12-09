import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthComponent } from './auth/auth.component';
import { NotAvailableComponent } from './sared/not-available/not-available.component';
import { Cart } from './shared/cart.model';
import { CartComponent } from './products/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent, pathMatch: 'full'},
      { path: ':id', component: ProductDetailComponent },
      { path: 'new', component: ProductEditComponent }
    ]
  },
  { path: 'auth', component: AuthComponent},
  { path: 'cart', component: CartComponent},
  { path: '**', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
