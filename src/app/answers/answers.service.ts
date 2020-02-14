import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ProfileService} from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor() {
  }

  checkUser() {
    return localStorage.getItem('userId');
  }

  checkUser2(data: any) {
    console.log(data);
    ///if()////
    return  data[0].user_id == localStorage.getItem('userId')  ;
  }

  // getPost(id: any): Observable<any> {
  //   return of(this.data.find(post => post.id === id));
  // }

}
