import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ProfileService} from './profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private data: any;

  constructor(private profileService: ProfileService) {
  }

  getPost(id: any): Observable<any> {
    return of(this.data.find(post => post.id === id));
  }

  this.profileService.
}
