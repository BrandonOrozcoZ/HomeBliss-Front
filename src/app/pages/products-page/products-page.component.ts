import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  products: ProductGetDTO[] = [];
  type: string = "ALL";
  typeLoaded = false;

  query: string = "";
  queryLoaded = false;

  constructor(private productService: ProductService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.params.subscribe((params: any) => {
      this.type = params && params.type ? params.type : "ALL";
      this.typeLoaded = true;
      this.loadQuery();
    });
    this.route.queryParams.subscribe((params: any) => {
      this.query = params && params.q ? params.q : "";
      this.queryLoaded = true;
      this.loadQuery();
    });
  }

  get defQuery() {
    return this.query;
  }

  public search(event: SubmitEvent) {
  
    const formData = new FormData(event.target as any);
    const query = String(formData.get('q'));

    let url = `/products/${this.type}`;
    if (query && query.trim() && query.length > 0) {
      url += `?q=${query}`
    }

    window.location.href = url;

  }

  private loadQuery() {
    
    if (!this.typeLoaded || !this.queryLoaded) {
      return;
    }

    console.log("Search...");
    this.productService.findProductsByCategory(this.type, this.query).then(products => {
      this.products = products;
      console.log(products);
    });

  }

}
