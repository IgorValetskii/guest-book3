import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()


export class JWTInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('123');
    // if ( localStorage.getItem('access-token')){
    //
    // }
    const authToken = `Bearer ${localStorage.getItem('access-token')}`;
    console.log(authToken);

    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    console.log(authReq);

    // req = req.clone({
    //
    //   headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('access-token')}`)
    //
    // });

    return next.handle(authReq);
  }
}
