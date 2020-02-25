import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {AuthenticationService} from './auth/auth.service';

@Injectable()


export class JWTInterceptor implements HttpInterceptor {
  get user() {
    return this.authenticationService.user;
  }

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available


    // console.log(this.user);


    this.authenticationService.user$.subscribe(res => {
      // console.log(res);

      if (res && res.user.id && res.token.access_token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.token.access_token}`,
            // Accept: `application/json`
          }
        });
      }
    });
    return next.handle(request);

    // const authToken = `Bearer ${localStorage.getItem('access-token')}`;
    // const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    //
    // return next.handle(authReq);
  }
}
