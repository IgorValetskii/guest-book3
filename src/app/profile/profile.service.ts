import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AnswersService} from '../answers.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private id: any;

  constructor(
    private answersService: AnswersService
  ) {
  }

  getPosts(data: any): Observable<any> {

    console.log(`полученные посты : ${data[2].id}`);
    this.answersService

    // return of(data.find(post => post.id === this.id));
  }
}
