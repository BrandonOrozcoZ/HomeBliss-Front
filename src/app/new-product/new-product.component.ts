import { Component } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  categories:string[];

  constructor(){
    this.categories = [];
    this.getCategories();
  }

  private getCategories(){
    this.categories.push('Tecnología');
    this.categories.push('Deporte');
    this.categories.push('Vehículo');
    this.categories.push('Zapatos');
  }

}
