import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AccessComponent } from './pages/access/access.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { AdminProductsPageComponent } from './pages/admin-products-page/admin-products-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProductComponent,
    ProductViewComponent,
    NewProductComponent,
    AccessComponent,
    CategoryListComponent,
    FavoritesComponent,
    CartComponent,
    SearchComponent,
    ProductManagementComponent,
    ProductDetailComponent,
    AdminProductsPageComponent,
    ProductsPageComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
