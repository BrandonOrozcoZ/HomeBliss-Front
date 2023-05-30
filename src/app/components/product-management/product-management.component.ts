import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent {
  products: ProductGetDTO[];

  constructor(private productService: ProductService, private toastr: ToastrService) {
    this.products = [];
    productService.findMyProducts().then(loaded => {
      this.products = loaded;
    });
  }

  public delete(product: ProductGetDTO) {
    this.productService.delete(product.id).then(res => {
      this.products = this.products.filter((i) => i != product);
      this.toastr.success(String(res?.answer));
    }).catch(res => {
      return this.toastr.warning(String(res.error.answer));
    });
  }
}
