import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/model/product-dto';
import { ProductGetDTO } from 'src/app/model/product-get-dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input("product") product: ProductGetDTO;

  constructor(private router: Router){
    this.product = new ProductGetDTO();
  }

  public getProductView() {
    this.router.navigate(['product']);
  }



  

}
