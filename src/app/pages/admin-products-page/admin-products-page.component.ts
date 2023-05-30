import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductModeratorGetDTO } from 'src/app/model/product-moderator-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products-page',
  templateUrl: './admin-products-page.component.html',
  styleUrls: ['./admin-products-page.component.css']
})
export class AdminProductsPageComponent {

  products: ProductModeratorGetDTO[] = [];
  stateSearch: string = "SINREVISAR";

  constructor(private productService: ProductService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.route.params.subscribe((params: any) => {
      this.stateSearch = params && params.state ? params.state : "SINREVISAR";
      productService.getProductsByState(this.stateSearch).then(products => {
        this.products = products;
      });
    });
  }

  public auth(product: ProductModeratorGetDTO) {
    this.productService.updateState(product.id, "AUTORIZADO").then(() => {
      this.toastr.success("¡Se ha autorizado correctamente el producto!");
      this.products = this.products.filter(a => a.id != product.id);
    }).catch((res) => {
      return this.toastr.warning(String(res.error.answer));
    });
  }

  public denied(product: ProductModeratorGetDTO) {
    this.productService.updateState(product.id, "DENEGADO").then(() => {
      this.toastr.success("¡Se ha denegado correctamente el producto!");
      this.products = this.products.filter(a => a.id != product.id);
    }).catch((res) => {
      return this.toastr.warning(String(res.error.answer));
    });
  }

}
