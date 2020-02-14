import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

// import {AnswersService} from '../answers.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPosts() {
    // return this.http.get('https://guest-book.naveksoft.com/api/v1/posts', {params: {page: '1'}});
    return this.http.get('https://guest-book.naveksoft.com/api/v1/posts');
  }

  postMessage(message: any) {
    return this.http.post('https://guest-book.naveksoft.com/api/v1/posts', message);
  }

  postAnswer(message: any, postId: any) {
    return this.http.post(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers`, message);
  }

  getAnswers(postId: any) {
    return this.http.get(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers`);
  }

  deletePost(postId: any) {
    return this.http.delete(`https://guest-book.naveksoft.com/api/v1/posts/${postId}`);
  }

  deleteAnswer(postId: any, answerId: any) {
    return this.http.delete(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers/${answerId}`);
  }
}
