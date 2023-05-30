import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {

  @Input()
  product!: ProductGetDTO;

  constructor(private cartService: CartService, private route: ActivatedRoute){

  }

  public addToCart() {
    
  }

}
