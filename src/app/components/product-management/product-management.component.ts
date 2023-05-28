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

  constructor(private productServicio: ProductService, private toastr: ToastrService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.products = this.productServicio.getList();
  }

  public delete(product: ProductGetDTO) {
    this.products = this.products.filter((i) => i != product);
    this.toastr.success("Se ha eliminado correctamente");
  }
}
