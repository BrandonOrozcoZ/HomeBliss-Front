import { Component } from '@angular/core';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products: ProductGetDTO[] = [];

  constructor(private productService: ProductService){
    this.products = this.productService.getList();
  }

  public delete(){

  }
}
