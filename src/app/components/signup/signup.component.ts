import { Component } from '@angular/core';
import { ClientDTO } from 'src/app/model/client-dto';
import { ToastrService } from 'ngx-toastr';
import { Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageDTO } from 'src/app/model/message-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  client: ClientDTO;

  constructor(private toastr: ToastrService, private http: HttpClient, private router: Router){
    this.client = new ClientDTO();
  }

  public register(signup:Form){
    if(this.validatePassword()){
      this.http.post<MessageDTO<string>>(`${environment.api}api/auth/register`, {
        ...this.client
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).toPromise().then(res => {

        if (!res) {
          this.toastr.warning("¡Ha ocurrido un error inesperado!");
          return;
        }

        if (res.error) {
          this.toastr.warning(String(res.answer));
        } else {
          this.toastr.success("¡Se ha creado el usuario completamente!");
          this.router.navigate(["/"]);
        }

      }).catch(res => {
        return this.toastr.warning(String(res.error.answer));
      });
    }else{
      this.toastr.warning("Las contraseñas no coinciden");
    }
  }

  public validatePassword():boolean{
    return this.client.password == this.client.repeatPassword;
  }

}
