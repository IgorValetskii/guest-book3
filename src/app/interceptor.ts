import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()


export class JWTInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = `Bearer ${localStorage.getItem('access-token')}`;
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    return next.handle(authReq);
  }
}
