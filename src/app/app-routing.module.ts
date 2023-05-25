import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccessComponent } from './components/access/access.component';
import { NewProductComponent } from './components/new-product/new-product.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: AccessComponent}, 
    { path: "signup", component: AccessComponent},
    { path: "registerProduct", component: NewProductComponent},
    { path: "**", pathMatch: "full", redirectTo: ""}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
