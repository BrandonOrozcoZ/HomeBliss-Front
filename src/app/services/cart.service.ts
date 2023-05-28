import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: number[];

  constructor(private toastr: ToastrService) {
    this.products = [];
  }
  public add(id: number) {
    if(!this.products.find(p => p == id)){
      this.products.push(id);
      this.toastr.success("Se ha agregado al carrito correctamente");
    }else{
      this.toastr.success("Se ha eliminado correctamente");
    }
  }
  public delete(id: number) {
    let i = this.products.indexOf(id);
    this.products.splice(i, 1);
  }
  public getList(): number[] {
    return this.products;
  }
}
