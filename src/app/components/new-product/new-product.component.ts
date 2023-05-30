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
    this.categories = productService.getCategories().map(c => c.name);
    this.idProduct = 0;
    this.product = new ProductGetDTO();

    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];
      if (this.idProduct) {
        this.productService.get(this.idProduct).then(productObject => {
          if (!productObject) return;
          this.product = productObject;
          this.isEdit = true;
        });
      }
    });
  }

  public createProduct() {
    if (this.product.categories.length > 0) {
      if (this.files && this.files.length > 0) {
        const files = this.files ? Array.from(Array(this.files.length).keys()).map((_, idx) => this.files[idx]) : [];
        if (!this.isEdit) {
          this.productService.create(this.product, files).then(product => {
            this.toastr.success('Se ha creado correctamente el producto');
            this.router.navigate(['/profile/products']);
          }).catch(res => {
            return this.toastr.warning(String(res.error.answer));
          });
        } else {
          this.productService.update(this.product, files).then(product => {
            this.toastr.success('Se ha actualizado correctamente el producto');
            this.router.navigate(['/profile/products']);
          }).catch(res => {
            return this.toastr.warning(String(res.error.answer));
          });
        }
      } else {
        this.toastr.warning('Debe seleccionar al menos una imagen');
      }
    } else {
      this.toastr.warning('Debe seleccionar al menos una categoría');
    }
  }

  public changeImages(url: any) {
    this.product.images = [url];
  }

  public validateImages(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;

      const self = this;
      const reader = new FileReader();
      reader.onload = function (e: any) {
        self.changeImages(e.target.result);
      }
      reader.readAsDataURL(this.files[0]);

      
    }
  }
}
