import {Injectable} from '@angular/core';
import Echo from 'laravel-echo';
import {Observable, observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketEchoService {

  echo: Echo;

   subject: any = new Subject();

  constructor() {
  }


  initConnection() {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'key',
      wsHost: 'guest-book.naveksoft.com',
      wsPort: '443',
      wssPort: '443',
      wsPath: '/ws',
      encrypted: true,
      authEndpoint: 'https://guest-book.naveksoft.com/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
      },
      // tslint:disable-next-line: max-line-length
      enabledTransports: ['ws', 'wss'], // https://github.com/beyondcode/laravel-websockets/issues/86
      disableStats: true,
    });

    // this.echo.private(`message`)
    //   .listen('SendPush', (e) => {
    //     console.log(e);
    //
    //     console.log(e.message);
    //
    //     console.log(e.message.message);
    //     const answerAdmin = e.message.message;
    //
    //     this.subject.next( answerAdmin);
    //
    //   });

    // this.echo.channel(`posts`)      ///// будет такой рабочий канал
    //   .listen('PublicPush', (e) => {
    //     console.log(e);
    //
    //     console.log(e.message);
    //
    //     console.log(e.message.message);
    //     const answerAdmin = e.message.message;
    //
    //     this.subject.next( answerAdmin);
    //
    //   });

    // this.echo.private(`user.${id}`) ////    будет такой рабочий канал
    //   .listen('UserPush', (e) => {
    //     console.log(e);
    //
    //     console.log(e.message);
    //
    //     console.log(e.message.message);
    //     const answerAdmin = e.message.message;
    //
    //     this.subject.next( answerAdmin);
    //
    //   });

    this.echo.channel(`public-push`)
      .listen('PublicPush', (e) => {
        console.log(e);
      });

    console.log(this.echo);
  }
}
