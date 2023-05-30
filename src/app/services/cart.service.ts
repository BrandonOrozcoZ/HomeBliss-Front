import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductCart } from '../model/product-cart';
import { ProductGetDTO } from '../model/product-get-dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  products: ProductCart[];

  constructor(private toastr: ToastrService) {
    if (localStorage.getItem("app-homebliss-list") != null) {
      this.products = JSON.parse(String(localStorage.getItem("app-homebliss-list")));
    } else {
      this.products = [];
    }
  }

  public add(product: ProductGetDTO, count: number) {
    let newProduct = this.products.filter(p => p.id === product.id)[0];
    if (!newProduct) {
      newProduct = {
        id: product.id,
        name: product.name,
        images: product.images,
        count: count
      } as ProductCart;
      this.products.push(newProduct);
      this.toastr.success("Se ha agregado al carrito correctamente");
    } else {
      newProduct.count += count;
      this.toastr.success("Se ha actualizado al carrito correctamente");
    }
    localStorage.setItem("app-homebliss-list", JSON.stringify(this.products));
  }

  public delete(id: number): ProductCart[] {
    const next = this.products = this.products.filter(p => p.id !== id);
    localStorage.setItem("app-homebliss-list", JSON.stringify(next));
    return next;
  }

  public size(): number {
    return this.products.length;
  }

  get getList(): ProductCart[] {
    return this.products;
  }

}
