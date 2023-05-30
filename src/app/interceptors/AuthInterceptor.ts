import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.token) {
      const nextReq = req.clone({ 
        headers: req.headers.set("Authorization", `Bearer ${this.auth.token}`)
      });
      return next.handle(nextReq);
    }
    return next.handle(req);
  }

}