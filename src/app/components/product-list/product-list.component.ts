import { Component, Input } from '@angular/core';
import { ProductGetDTO } from 'src/app/model/product-get-dto';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input()
  products: ProductGetDTO[] = [];

}
