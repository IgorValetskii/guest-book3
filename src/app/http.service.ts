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
    // const body = {email: user.email, password: user.password};
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/login', user);
  }

  postNewUser(user: User) {
    // const body = {email: user.email, password: user.password};
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/register', user);
  }

  getPosts() {
    return this.http.get('https://guest-book.naveksoft.com/api/v1/posts');
  }

  postMessage(message: any) {
    return this.http.post('https://guest-book.naveksoft.com/api/v1/posts', message);
  }

  postAnswer(message: any){
    return this.http.post('https://guest-book.naveksoft.com/api/v1/posts/12/answers', message);
  }
}
