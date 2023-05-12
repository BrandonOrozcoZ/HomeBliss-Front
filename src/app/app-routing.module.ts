import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccessComponent } from './components/access/access.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: AccessComponent}, 
    { path: "signup", component: AccessComponent},
    { path: "**", pathMatch: "full", redirectTo: ""}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
