import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authorized: boolean;

  constructor() {
  }

  // AuthCheck() {
  //   localStorage.getItem('access-token') ? true : false;
  // }

}
