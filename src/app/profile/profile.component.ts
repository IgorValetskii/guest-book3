import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

// import {WebsocketService} from '../websocket/websocket.service';
import {SocketEchoService} from '../socket-echo.service';
import {ProfileService} from './profile.service';
import {WS} from '../websocket/websocket.events';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  recievedData: any;
  users: any;
  name: any;
  email: any;
  posts: any;
  userName: any;
  receivedMessage: any; // полученный ответ после отправки сообщения

  done: any;
  postId: any;
  testAnswer: any;

  allposts: any = new Subject();

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private socketEchoService: SocketEchoService,
    private profileService: ProfileService
  ) {
    // this.wsService.on<IMessage[]>('messages')
    //   .subscribe((messages: IMessage[]) => {
    //     console.log(messages);
    //
    //     this.wsService.send('text', 'Test Text!');
    //   });
    // this.wsService.on<IMessage[]>(WS.ON.MESSAGES)
    //   .subscribe((messages: IMessage[]) => {
    //     console.log(messages);
    //
    //     this.wsService.send(WS.SEND.TEXT, 'Test Text!');
    //   });
  }

  messageReactiveForm: FormGroup;

  ngOnInit() {
    this.httpService.getPosts()
      .subscribe(
        (data: any) => {
          this.recievedData = data;
          console.log(this.recievedData.data);

          // this.recievedData.data

          // console.log(this.recievedData.data[0].user.name);

          this.posts = this.recievedData.data;

          this.profileService.getPosts(this.posts);

          this.allposts.next(this.posts); // полученный массив постов прокидываю дальше на подписчиков

          this.userName = localStorage.getItem('user');
          // console.log(this.userName);

          this.socketEchoService.initConnection();


        },
        error => console.log(error)
      );

    this.initForm();

    this.showAllAnswers();

  }

  initForm() {
    this.messageReactiveForm = this.fb.group({

      message: ['Hello all !', [
        Validators.required,
      ]
      ],

      title: ['AAAAAAAA', [
        Validators.required,
      ]
      ],
    });
  }

  onSubmit() {
    const controls = this.messageReactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.messageReactiveForm.invalid) {
      console.log('форма не валдина');
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.messageReactiveForm.value);

// // отправляет отзыв
//     this.httpService.postMessage(this.messageReactiveForm.value)
//       .subscribe(
//         (data: any) => {
//           this.receivedMessage = data;
//           this.done = true;
//           console.log(this.receivedMessage);
//
//         },
//         error => console.log(error)
//       );

    // отправляет ответ на отзыв /////////////////////////////////////////////
    this.httpService.postAnswer(this.messageReactiveForm.value)
      .subscribe(
        (data: any) => {
          this.receivedMessage = data;
          this.done = true;
          console.log(this.receivedMessage);

          console.log(this.receivedMessage.post_id);

          this.postId = this.receivedMessage.post_id;

          console.log(this.postId === this.receivedMessage.post_id);
        },
        error => console.log(error)
      );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.messageReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  logout() {
    localStorage.clear();
    this.goToLoggin();
  }

  goToLoggin() {
    this.router.navigate(['login']);
  }

  showAllAnswers() {
    this.socketEchoService.subject
      .subscribe(
        v => {
          console.log('Observer 1: ' + v);
          this.testAnswer = v;

        }
      );

  }

 //  getAnswers(event) {
 //    // this.httpService.getAnswers(this.postId);
 // // {{post.user.id}}
 //
 //    console.log(event);
 //    // console.log(id);
 //  }

}
