import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductElementComponent } from './products/product-list/product-element/product-element.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductDetailComponent} from './products/product-detail/product-detail.component';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { CartComponent } from './products/cart/cart.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { AddProductComponent } from './products/add-product/add-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import { from } from 'rxjs';
import { LogOutconfirmationComponent } from './shared/dialogs/log-outconfirmation/log-outconfirmation.component';
import { AuthSmallComponent } from './auth/auth-small/auth-small.component';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SidePanelComponent,

    ProductsComponent,
    ProductListComponent,
    ProductElementComponent,
    ProductEditComponent,
    ProductDetailComponent,
    AuthComponent,
    LoadingComponent,
    CartComponent,
    AddProductComponent,
    LogOutconfirmationComponent,
    AuthSmallComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
