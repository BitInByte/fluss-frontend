import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authStore.token) {
      const modifiedReq = request.clone({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.authStore.token}`
        ),
      });

      return next.handle(modifiedReq);
    }

    return next.handle(request);
  }
}
