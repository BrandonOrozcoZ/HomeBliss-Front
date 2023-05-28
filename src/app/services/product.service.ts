import { Injectable } from '@angular/core';
import { ProductGetDTO } from '../model/product-get-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductGetDTO[];
  constructor() {
    this.products = [];
    this.products.push(this.createProduct(1, 'Televisor LG 4K', 'Descripcion 1', 3500000, 2, ['https://picsum.photos/450/225', 'https://picsum.photos/450/225'], ['TECNOLOGIA']));
    this.products.push(this.createProduct(2, 'Tenis Nike', 'Descripcion 2', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'DEPORTE']));
    this.products.push(this.createProduct(3, 'Tenis Adidas', 'Descripcion 3', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'COCINA']));
    this.products.push(this.createProduct(4, 'Tenis Jordan', 'Descripcion 4', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'TECNOLOGIA']));
    this.products.push(this.createProduct(5, 'Tenis valenciaga', 'Descripcion 5', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'DEPORTE']));
    this.products.push(this.createProduct(6, 'Tenis classic', 'Descripcion 6', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'TECNOLOGIA']));
    this.products.push(this.createProduct(7, 'Tenis reebok', 'Descripcion 7', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'HOGAR']));
    this.products.push(this.createProduct(8, 'Tenis Converse', 'Descripcion 8', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'HOGAR', 'TECNOLOGIA']));
    this.products.push(this.createProduct(9, 'Tenis Converse', 'Descripcion 8', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'DEPORTE']));
    this.products.push(this.createProduct(10, 'Tenis Converse', 'Descripcion 8', 650000, 4, ['https://picsum.photos/450/225'], ['ROPA', 'DEPORTE']));
  }
  
  public getList(): ProductGetDTO[] {
    return this.products;
  }

  public createProduct(id: number, name:string, description:string, price:number, stock:number, images:string[], categories:string[]):ProductGetDTO{
    let product = new ProductGetDTO();
    product.id = id;
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.images = images;
    product.categories = categories;
    return product;
  }

  public get(id:number):ProductGetDTO | undefined{
    return this.products.find(p => p.id == id);
  }

  public update(editedProduct:ProductGetDTO):ProductGetDTO[]{
    return this.products.map(product => product.id !== editedProduct.id ? product : editedProduct);
  }

}
