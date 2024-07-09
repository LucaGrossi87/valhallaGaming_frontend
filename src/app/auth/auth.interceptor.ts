import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getAccessToken();

    if (authToken) {
      const newRequest = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authToken),
      });
      return next.handle(newRequest);
    }

    return next.handle(req);
  }
}
