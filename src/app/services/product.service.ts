import { Injectable } from '@angular/core';
import { ProductGetDTO } from '../model/product-get-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { MessageDTO } from '../model/message-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModeratorGetDTO } from '../model/product-moderator-get-dto';
import { Category } from '../model/category';
import { ProductClientGetDTO } from '../model/product-client-get-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private auth: AuthService) {
    
  }

  public getCategories(): Category[] {
    return [
      new Category('TECNOLOGIA', 'fa-solid fa-laptop'),
      new Category('DEPORTE', 'fa-solid fa-bicycle'),
      new Category('HOGAR', 'fa-solid fa-home'),
      new Category('PRODUCTIVIDAD', 'fa-solid fa-shoe-prints')
    ]
  }

  public findProductsByCategory(type: string, query: string): Promise<ProductGetDTO[]> {
    return this.http.get<MessageDTO<ProductGetDTO[]>>(`${environment.api}api/product/category/${type}?q=${query}`)
      .toPromise().then(res => {
        return res?.answer || [];
      }).catch(_ => []);
  }

  public getProductsByState(state: string): Promise<ProductModeratorGetDTO[]> {
    return this.http.get<MessageDTO<ProductModeratorGetDTO[]>>(`${environment.api}api/moderator/state/${state}`)
      .toPromise().then(res => {
        return res?.answer || [];
      }).catch(_ => []);
  }

  public findMyProducts(): Promise<ProductGetDTO[]> {
    return this.http.get<MessageDTO<ProductGetDTO[]>>(`${environment.api}api/product/client/${this.auth.getLogged()?.id}`)
      .toPromise().then(res => {
        return res?.answer || [];
      }).catch(_ => []);
  }

  public upload(productId: number, file: File): Promise<string | undefined> {
    const form = new FormData();
    form.append("archive", file);
    form.append("id", String(productId));
    return this.http.post<MessageDTO<string>>(`${environment.api}api/product/upload`, form).toPromise().then(res => {
      if (!res || res.error || !res.answer) {
        return undefined;
      }
      return res.answer;
    });
  }

  public delete(productId: number): Promise<MessageDTO<string> | undefined> {
    return this.http.delete<MessageDTO<string>>(`${environment.api}api/product/${productId}`).toPromise();
  }
  

  public create(product: ProductGetDTO, files: File[]): Promise<ProductGetDTO | undefined> {

    return this.http.post<MessageDTO<number>>(`${environment.api}api/product/create`, {
      ...product,
      images: [],
      sellerCode: this.auth.getLogged()?.id
    }).toPromise().then(res => {

      if (!res || res.error) {
        return undefined;
      }

      const productId = res.answer;
      if (!productId) {
        return undefined;
      }

      const promise = Promise.all(files.map(file => this.upload(productId, file)));

      return promise.then(images => {
        const newProduct = {
          ...product,
          id: productId,
          sellerCode: this.auth.getLogged()?.id,
          images
        } as ProductGetDTO;
        return newProduct;
      });

    });
  }

  public changeMyFavorite(productId: number): Promise<boolean> {
    return this.http.put<MessageDTO<boolean>>(`${environment.api}api/favorites/change/${productId}`, {}).toPromise().then(res => {
      return res && res.answer || false;
    });
  }

  public get(productId: number): Promise<ProductGetDTO | undefined> {
    return this.http.get<MessageDTO<ProductGetDTO>>(`${environment.api}api/product/${productId}`).toPromise().then(res => {
      return res && res.answer ? res.answer : undefined;
    });
  }

  public getAllFavoriteByClient(): Promise<ProductGetDTO[]> {
    return this.http.get<MessageDTO<ProductGetDTO[]>>(`${environment.api}api/product/by-client`).toPromise().then(res => {
      return res && res.answer ? res.answer : [];
    }).catch(() => []);
  }

  public getByClient(productId: number): Promise<ProductClientGetDTO | undefined> {
    return this.http.get<MessageDTO<ProductClientGetDTO>>(`${environment.api}api/product/by-client/${productId}`).toPromise().then(res => {
      return res && res.answer ? res.answer : undefined;
    });
  }

  public update(product: ProductGetDTO, files: File[] = []): Promise<ProductGetDTO | undefined> {
    return Promise.all(files.map(file => this.upload(product.id, file))).then(newImages => {
      const newProduct = {
        ...product,
        images: newImages.length == 0 ? product.images : newImages
      } as ProductGetDTO;
      return this.http.put<MessageDTO<ProductGetDTO>>(`${environment.api}api/product/${product.id}`, newProduct)
          .toPromise()
          .then(res => res && res.answer ? res.answer : undefined)
    });
  }

  public updateState(productCode: number, state: string): Promise<ProductGetDTO | undefined> {
    const reason = state === 'AUTORIZADO' ? "Se cumplió con los requisitos minimos de un producto." : "Algunas requisitos no fueron encontrados.";
    return this.http.post<MessageDTO<ProductGetDTO>>(`${environment.api}api/moderator/create`, {
      reason,
      state,
      productCode: productCode,
      moderatorCode: this.auth.getLogged()?.id
    }).toPromise().then(res => {
      return res && res.answer ? res.answer : undefined;
    });
  }

}
