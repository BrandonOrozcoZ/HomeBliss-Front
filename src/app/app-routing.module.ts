import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccessComponent } from './pages/access/access.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AdminProductsPageComponent } from './pages/admin-products-page/admin-products-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "access", component: AccessComponent}, 
    { path: "profile/products/create", component: NewProductComponent},
    { path: "editProduct/:id", component: NewProductComponent},
    { path: "categories", component: CategoryListComponent},
    { path: "product/:id", component: ProductViewComponent},
    { path: "profile/favorites", component: FavoritesComponent},
    { path: "cart", component: CartComponent},
    { path: "search/:text", component: SearchComponent },
    { path: "products/:type", component: ProductsPageComponent},
    { path: "products", redirectTo: "/products/ALL"},
    { path: "profile/products", component: ProductManagementComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "admin/products/:state", component: AdminProductsPageComponent},
    { path: "admin/products", redirectTo: "/admin/products/SINREVISAR"},
    { path: "**", pathMatch: "full", redirectTo: ""}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
