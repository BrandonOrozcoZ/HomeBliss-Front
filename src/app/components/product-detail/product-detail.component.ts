import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {

  idProduct: number = 0;

  constructor(private cartService: CartService, private route: ActivatedRoute){

    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];
    });
  }

  public addToCart() {
    this.cartService.add(this.idProduct);
  }
}
