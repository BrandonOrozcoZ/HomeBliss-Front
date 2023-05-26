import { Component, Input } from '@angular/core';
import { ProductDTO } from 'src/app/model/product-dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input("product") product: ProductDTO;

  constructor(){
    this.product = new ProductDTO();
  }

  

}
