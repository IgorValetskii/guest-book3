import {Injectable} from '@angular/core';
import Echo from 'laravel-echo';
import {Observable, observable, Subject} from 'rxjs';
import {AuthenticationService} from './auth/auth.service';
import {log} from 'util';


@Injectable({
  providedIn: 'root'
})
export class SocketEchoService {

  echo: Echo;

   subject: any = new Subject();

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user$.subscribe(user => {
      if (user){
        console.log('соединение к вебсокетам');
        // console.log(user.user.id)
        this.initConnection(user.user.id);
      } else {
        console.log('отключение вебсокетов');
        // this.subject.unsubscribe();
      }
    })
  }


  initConnection(userId) {
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
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token.access_token}`,
          Accept: `application/json`
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

    this.echo.channel(`posts`)      ///// будет такой рабочий канал
      .listen('PublicPush', (e) => {
        // console.log(e);
        this.subject.next(e);
      });

    this.echo.private(`user.${userId}`) ////    будет такой рабочий канал
      .listen('UserPush', (e) => {
        console.log(e);

        // console.log(e.message);
        //
        // console.log(e.message.message);
        // const answerAdmin = e.message.message;
        //
        this.subject.next(e);

      });

    //
    // this.echo.channel(`public-push`)
    //   .listen('PublicPush', (e) => {
    //     console.log(e);
    //   });

    console.log(this.echo);
  }
}
