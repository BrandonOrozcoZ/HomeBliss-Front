import { Component } from '@angular/core';
import { ClientDTO } from 'src/app/model/client-dto';
import { ToastrService } from 'ngx-toastr';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  client: ClientDTO;

  constructor(private toastr: ToastrService){
    this.client = new ClientDTO();
  }

  public register(signup:Form){
    if(this.validatePassword()){
      console.log(this.client);
      signup.reset();
    }else{
      this.toastr.warning("Las contraseñas no coinciden");
    }
  }

  public validatePassword():boolean{
    return this.client.password == this.client.repeatPassword;
  }

}
