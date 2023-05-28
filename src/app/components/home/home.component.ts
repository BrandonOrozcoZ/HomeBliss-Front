import { Component } from '@angular/core';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: ProductGetDTO[];

  constructor(private productService: ProductService){
    this.products = this.productService.getList(); 
  }

}
