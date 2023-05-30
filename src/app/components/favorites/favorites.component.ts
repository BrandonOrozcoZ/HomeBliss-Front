import { Component } from '@angular/core';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {

  products: ProductGetDTO[];

  constructor(private productService: ProductService){
    this.products = [];
    productService.getAllFavoriteByClient().then(ps => this.products = ps); 
  }
}
