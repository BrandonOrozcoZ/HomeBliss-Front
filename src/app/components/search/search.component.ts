import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  products: ProductGetDTO[];
  filter: ProductGetDTO[];
  search: string;

  constructor(private router: ActivatedRoute, private productService: ProductService) {
    this.search = '';
    this.products = [];
    this.filter = [];

    this.router.params.subscribe((params) => {
      this.search = params['text'];
      this.filter = this.products.filter((p) =>
        p.name.toLowerCase().includes(this.search.toLowerCase())
      );
    });
  }
}
