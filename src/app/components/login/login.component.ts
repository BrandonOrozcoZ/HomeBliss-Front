import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientDTO } from 'src/app/model/client-dto';
import { LoginSuccessTokenDTO } from 'src/app/model/login-success-token-dto';
import { MessageDTO } from 'src/app/model/message-dto';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  client: ClientDTO;

  constructor(private toastr: ToastrService, private http: HttpClient, private auth: AuthService, private router: Router){
    this.client = new ClientDTO();
  }
  
  login(form: Form) {
    this.http.post<MessageDTO<LoginSuccessTokenDTO>>(`${environment.api}api/auth/login`, {
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
        this.toastr.success("¡Te has logueado correctamente!");
        this.auth.signToken(res.answer?.token);
        this.router.navigate(['/']);
      }

    }).catch(res => {
      return this.toastr.warning(String(res.error.answer));
    });
  }

}
