import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDTO } from 'src/app/model/product-dto';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent {
  categories: string[];
  product: ProductDTO;
  files!:FileList

  constructor(private toastr: ToastrService) {
    this.categories = [];
    this.getCategories();
    this.product = new ProductDTO();
  }

  private getCategories() {
    this.categories.push('Tecnología');
    this.categories.push('Deporte');
    this.categories.push('Vehículo');
    this.categories.push('Zapatos');
  }

  public createProduct() {
    if(this.product.images != null && this.product.images.length > 0){
      console.log(this.product);
    }else{
      this.toastr.warning("Debe seleccionar al menos una imagen");
    }
  }

  public validateImages(event: any) {
    if (event.target.files.length > 0) {
      this.product.images = event.target.files;
    }
  }
}
