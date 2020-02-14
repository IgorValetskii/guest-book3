import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

// import {WebsocketService} from '../websocket/websocket.service';
import {SocketEchoService} from '../socket-echo.service';
import {ProfileService} from './profile.service';
import {WS} from '../websocket/websocket.events';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/auth.service';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  receivedData: any;
  userName: string;
  userId: string;
  answers: any;
  isAdmin: boolean;

  showedAnswerId: string;
  avatar: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketEchoService: SocketEchoService,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
  }

  messageReactiveForm: FormGroup;
  answerReactiveForm: FormGroup;

  ngOnInit() {
    this.profileService.getPosts()
      .subscribe(
        (data: any) => {
          this.receivedData = data.data;
          console.log(this.receivedData);

          this.userName = JSON.parse(localStorage.getItem('currentUser')).user.name;
          this.userId = JSON.parse(localStorage.getItem('currentUser')).user.id;
          // this.avatar = JSON.parse(localStorage.getItem('currentUser')).user.avatar;

          if (JSON.parse(localStorage.getItem('currentUser')).user.is_admin === 1) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          console.log(this.isAdmin);


          console.log(this.userName);

          // this.socketEchoService.initConnection();


        },
        error => console.log(error)
      );


    this.initForm();

    this.socketEchoService.subject
      .subscribe(
        v => {

          // console.log(this.authenticationService.user._value.user);
          console.log(1);
          if (v && v.data.type === 'post_added') {
            console.log(2);
            if (this.authenticationService.user._value.user && this.authenticationService.user._value.user.id !== v.data.data.user_id) {
              console.log(3);
              this.receivedData.push(v.data.data);
            }
          }
          console.log(this.authenticationService.user);
          console.log(this.authenticationService.user._value.user.id);
          console.log(v.data.data.user_id);

          if (v && v.data.type === 'answer_added') {
            console.log(4);

            if (this.authenticationService.user._value.user && this.authenticationService.user._value.user.id !== v.data.data.user_id) {
              console.log(5);
              console.log(this.answers.data);
              this.answers.data.push(v.data.data);
            }
          }

        }
      );
  }

  initForm() {
    this.messageReactiveForm = this.fb.group({

      message: ['', [
        Validators.required,
      ]
      ],

      title: ['message title', [
        Validators.required,
      ]
      ],
    });

    this.answerReactiveForm = this.fb.group({

      message: ['answer', [
        Validators.required,
      ]
      ],

      // title: ['answer title', [
      //   Validators.required,
      // ]
      // ],
    });
  }

  onSubmitPost() {
    const controls = this.messageReactiveForm.controls;

    // /** Проверяем форму на валидность */
    if (this.messageReactiveForm.invalid) {
      console.log('форма не валдина');
      // /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      // /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.messageReactiveForm.value);

// отправляет отзыв
    this.profileService.postMessage(this.messageReactiveForm.value)
      .subscribe(
        (data: any) => {
          // this.receivedMessage = data;
          // this.done = true;
          console.log(data);
          this.receivedData.push(data);
        },
        error => console.log(error)
      );
  }

  onSubmitAnswer(postId) {
    const controls = this.answerReactiveForm.controls;

    // /** Проверяем форму на валидность */
    if (this.answerReactiveForm.invalid) {
      console.log('форма не валдина');
      // /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      // /** Прерываем выполнение метода*/
      return;
    }

    // /** TODO: Обработка данных формы */
    console.log(this.answerReactiveForm.value);

    // отправляет ответ на отзыв /////////////////////////////////////////////
    this.profileService.postAnswer(this.answerReactiveForm.value, postId)
      .subscribe(
        (data: any) => {
          this.answers.data.push(data);
          console.log(data);
          // console.log(data.post_id);
        },
        error => console.log(error)
      );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.messageReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }


  deletePost(postId) {
    // console.log(postId);
    this.profileService.deletePost(postId)
      .subscribe((data: any) => {
          // this.receivedData = data;
          console.log(data);


        },
        error => console.log(error)
      );
  }

  getAnswers(postId) {
    this.showedAnswerId = postId;
    this.profileService.getAnswers(postId)
      .subscribe(data => {
        console.log(data);
        this.answers = data;
        console.log(this.answers.data);


      });
  }

  deleteAnswer(postId, answerId) {
    console.log(postId);
    console.log(answerId);

    this.profileService.deleteAnswer(postId, answerId)
      .subscribe((data: any) => {
          // const result = this.receivedData.filter(el => el.id !== answerId);
          // this.receivedData = result;
          // console.log(result);
          // console.log(this.receivedData);
          console.log(data);
        },
        error => console.log(error)
      );
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  //
  ngOnDestroy() {
    this.socketEchoService.subject.unsubscribe();

    console.log('сработал ондестрой');
  }

  //  getAnswers(event) {
  //    // this.httpService.getAnswers(this.postId);
  // // {{post.user.id}}
  //
  //    console.log(event);
  //    // console.log(id);
  //  }

}
