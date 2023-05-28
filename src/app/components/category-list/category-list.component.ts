import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  constructor(private router:Router){}
  
  public getProductView(){
    this.router.navigate(['product']);  
  }
}
