import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AuthComponent } from './auth/auth.component';
import { Cart } from './shared/models/cart.model';
import { CartComponent } from './products/cart/cart.component';
import { AuthSmallComponent } from './auth/auth-small/auth-small.component';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomepageComponent},
  { path: 'products', component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent, pathMatch: 'full'},
      { path: 'new', component: ProductEditComponent,canActivate: [AuthGuard] },
      { path: ':id', component: ProductDetailComponent },
      { path: 'edit/:editId', component: ProductEditComponent,canActivate: [AuthGuard]}

    ]
  },
  { path: 'auth', component: AuthComponent},
  { path: 'cart', component: CartComponent,canActivate:[AuthGuard]},
  { path: 'login', component: AuthSmallComponent},
  { path: '**', component: ProductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
