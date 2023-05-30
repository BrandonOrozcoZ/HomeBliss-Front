import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductClientGetDTO } from 'src/app/model/product-client-get-dto';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

  product: ProductClientGetDTO;
  idProduct: number;

  isEdit: boolean = false;
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) {

    this.idProduct = 0;
    this.product = new ProductClientGetDTO();

    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];
      if (this.idProduct) {
        this.productService.getByClient(this.idProduct).then(productObject => {
          if (!productObject) return;
          this.product = productObject;
          this.isEdit = true;
        });
      }
    });
  }

  addToCart(event: SubmitEvent){
    const element: any = event.target;
    const form = new FormData(element);
    const count = parseInt(String(form.get("count")));
    this.cartService.add(this.product, count);
  }
  
  addToFavorite(){
    if (this.loading) return;
    this.loading = true;
    this.productService.changeMyFavorite(this.product.id).then(res => {
      this.loading = false;
      this.product.favorite = res;
      if (res) {
        this.toastr.success("¡Se ha agregado a la lista de favoritos!");
      } else {
        this.toastr.success("¡Se ha eliminado de la lista de favoritos!");
      }
    });
  }

  get isUserLogged() {
    return this.authService.isLogged() && !this.authService.getLogged()?.moderator;
  }

}
