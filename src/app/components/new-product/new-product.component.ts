import { Component } from '@angular/core';
import { ProductDTO } from 'src/app/model/product-dto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  categories:string[];
  product:ProductDTO;

  constructor(){
    this.categories = [];
    this.getCategories();
    this.product = new ProductDTO();
  }

  private getCategories(){
    this.categories.push('Tecnología');
    this.categories.push('Deporte');
    this.categories.push('Vehículo');
    this.categories.push('Zapatos');
  }

  public createProduct(){
    
  }

}
