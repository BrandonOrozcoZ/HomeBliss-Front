import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../model/user-dto';
import { MessageDTO } from '../model/message-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  userLogged: UserDTO | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("auth-homebliss-app");
    this.userLogged = this.token ? JSON.parse(localStorage.getItem("auth-homebliss-data") as string) : null;
    if (this.token) {
      setTimeout(() => {
        if (this.token) this.signToken(this.token);
      }, 100);
    }
  }

  getUserDetails(token: string): Promise<UserDTO | null | undefined> {
    return this.http.get<MessageDTO<UserDTO>>(`${environment.api}api/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).toPromise()
      .then(result => {
        if (!result || result.error) {
          return undefined;
        }
        return result.answer;
      });
  }

  getLogged(): UserDTO | null {
    return this.userLogged;
  }

  isLogged(): boolean {
    return this.userLogged != null;
  }

  clear() {
    this.token = null;
    this.userLogged = null;
    localStorage.removeItem("auth-homebliss-app");
    localStorage.removeItem("auth-homebliss-data");
  }

  signToken(token: string | undefined) {
    if (token) {
      this.token = token;
      localStorage.setItem("auth-homebliss-app", token);
      this.getUserDetails(token).then(user => {
        if (user) {
          this.userLogged = user;
          localStorage.setItem("auth-homebliss-data", JSON.stringify(user));
        }
      })
    }
  }

}
