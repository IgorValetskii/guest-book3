import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from '../user';

// import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  user$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  private _user; /// КОСТЫЛЬ !!! НА пока что )

  public get user(): any {
    // console.log('сработал геттер юзера');
    // console.log(this._user);
    return this._user;
  }

  public set user(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this._user = user;
    this.user$.next(this._user);
  }


  constructor(private http: HttpClient) {
  }


  login(email: string, password: string) {
    return this.http.post('https://guest-book.naveksoft.com/api/v1/auth/login', {email, password})
      .pipe(tap(user => {
        this.user = user;
      }));
  }

  logout() {
    this.user = null;
  }
}
