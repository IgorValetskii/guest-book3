import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postUser(email: string, password: string) {
    // const body = {email: user.email, password: user.password};
    console.log({email, password});
    // tslint:disable-next-line:no-debugger
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/login', { email, password});
  }

  postNewUser(user:any) {
    // const body = {email: user.email, password: user.password};
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/register', user);
  }



}
