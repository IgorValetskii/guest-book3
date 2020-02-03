import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postUser(user: User) {
    console.log(456);
    // const body = {email: user.email, password: user.password};
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/login', user);
  }

  postNewUser(user: User) {
    console.log(456);
    // const body = {email: user.email, password: user.password};
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/register', user);
  }
}
