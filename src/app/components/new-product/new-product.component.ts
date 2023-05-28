import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductDTO } from 'src/app/model/product-dto';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  categories: string[];
  product: ProductGetDTO;
  files!: FileList;
  idProduct: number;

  isEdit: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.categories = [];
    this.idProduct = 0;
    this.getCategories();
    this.product = new ProductGetDTO();

    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];
      let productObject = this.productService.get(this.idProduct);
      if (productObject != null) {
        this.product = productObject;
        console.log(this.product);
        this.isEdit = true;
      }
    });
  }

  private getCategories() {
    this.categories.push('Tecnología');
    this.categories.push('Deporte');
    this.categories.push('Vehículo');
    this.categories.push('Zapatos');
  }

  public createProduct() {
    if (this.product.categories.length > 0) {
      if (this.product.images != null && this.product.images.length > 0) {
        if (!this.isEdit) {
          this.productService.products.push(this.product);
          this.toastr.success('Se ha creado correctamente el producto');
        } else {
          this.productService.products = this.productService.update(
            this.product
          );
          this.toastr.success('Se ha actualizado correctamente el producto');
        }
        this.router.navigate(['a']);
      } else {
        this.toastr.warning('Debe seleccionar al menos una imagen');
      }
    } else {
      this.toastr.warning('Debe seleccionar al menos una categoría');
    }
  }

  public validateImages(event: any) {
    if (event.target.files.length > 0) {
      this.product.images = event.target.files;
    }
  }
}
