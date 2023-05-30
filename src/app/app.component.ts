import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Homebliss-front';

  constructor(private router: Router, private authService: AuthService, private cartService: CartService){

  }

  get cartCount(): number {
    return this.cartService.size();
  }

  get isLogged() {
    return this.authService.isLogged();
  }

  get isModerator() {
    return this.authService.isLogged() && this.authService.getLogged() && this.authService.getLogged()?.moderator;
  }

  get isClient() {
    return !this.isModerator;
  }

  public clearSession() {
    this.authService.clear();
    this.router.navigate(["/"]);
  }


  public searchProducts(value: string){
    this.router.navigate(["/search", value]);
  }
}
