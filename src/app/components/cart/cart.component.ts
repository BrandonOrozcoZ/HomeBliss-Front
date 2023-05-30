import { Component } from '@angular/core';
import { ProductCart } from 'src/app/model/product-cart';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: ProductCart[] = [];

  constructor(private cartService: CartService){
    this.products = cartService.getList;
  }

  remove(product: ProductCart) {
    this.products = this.cartService.delete(product.id);
  }


}
