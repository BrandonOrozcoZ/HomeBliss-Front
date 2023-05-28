import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Homebliss-front';

  constructor(private router:Router){

  }

  public searchProducts(value: string){
    this.router.navigate(["/search", value]);
  }
}
