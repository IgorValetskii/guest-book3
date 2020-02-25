import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {SocketEchoService} from '../socket-echo.service';
import {ProfileService} from './profile.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';

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
  mySubscription: BehaviorSubject<any>;
  authorMessageId: number;
  currentUserId: number;
  messageId = 0;
  metaData: any;
  links: any;

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
          console.log(data);
          this.receivedData = data.data;
          this.metaData = data.meta;
          this.links = data.links;
          // console.log(this.receivedData);

          this.userName = JSON.parse(localStorage.getItem('currentUser')).user.name;
          this.userId = JSON.parse(localStorage.getItem('currentUser')).user.id;
          // this.avatar = JSON.parse(localStorage.getItem('currentUser')).user.avatar;

          if (JSON.parse(localStorage.getItem('currentUser')).user.is_admin === 1) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          // console.log(this.isAdmin);


          // console.log(this.userName);

          // this.socketEchoService.initConnection();


        },
        error => console.log(error)
      );


    this.initForm();

    this.mySubscription = this.socketEchoService.subject
      .subscribe(
        v => {

          // console.log(this.authenticationService.user._value.user);
          console.log(v);

          if (v && v.data.data.user_id && v.data.type === 'post_added') {
            this.authorMessageId = v.data.data.user_id;
            console.log('автор поста');
            console.log(this.authorMessageId);

            if (this.authorMessageId !== this.currentUserId && (this.messageId !== v.data.data.id)) {
              // console.log(v.data.data);
              this.messageId = v.data.data.id;
              console.log(this.messageId);
              this.receivedData.push(v.data.data);
            }
          }

          if (v.data.type === 'answer_added'){
            console.log(123);
          }
          if (v && v.data.data.user_id && v.data.type === 'answer_added') {
            this.authorMessageId = v.data.data.user_id;
            console.log('автор поста');
            console.log(this.authorMessageId);
            console.log(this.currentUserId);

            if (this.authorMessageId !== this.currentUserId && (this.messageId !== v.data.data.id)) {
              // console.log(v.data.data);
              this.messageId = v.data.data.id;
              console.log(this.messageId);
              this.answers.data.push(v.data.data);
            }
          }
          // if (v && v.data.data.user_id && v.data.type === 'post_added') {
          //   console.log(2);
          //
          //   this.authenticationService.user$
          //     .subscribe(el => {
          //
          //       if (el) {
          //         console.log('пришел бихейвиор юзер');
          //         console.log(el);
          //         if (v.data && el.user.id !== v.data.data.user_id) {
          //           console.log(el.user.id);
          //           console.log(v.data.data.user_id);
          //           // console.log(v.data);
          //           console.log('пушим');
          //           this.receivedData.push(v.data.data);
          //         }
          //       }
          //
          //     });
          //   // if (this.authenticationService.user.id !== v.data.data.user_id) {
          //   // console.log(3);
          //   // this.receivedData.push(v.data.data);
          // }

          // if (v && v.data.data.user_id && v.data.type === 'answer_added') {
          //
          //
          //   this.authenticationService.user$
          //     .subscribe(el => {
          //
          //       if (el) {
          //         console.log('пришел бихейвиор юзер');
          //         console.log(el);
          //         if (v.data && el.user.id !== v.data.data.user_id) {
          //
          //               this.answers.data.push(v.data.data);
          //         //   console.log(el.user.id);
          //         //   console.log(v.data.data.user_id);
          //         //   // console.log(v.data);
          //         //   console.log('пушим');
          //         //   this.receivedData.push(v.data.data);
          //         }
          //       }
          //
          //     });
          // }

          // if (v && v.data.type === 'post_added') {
          //   console.log(2);
          //   console.log(v);
          //   if (this.authenticationService.user && this.authenticationService.user.id !== v.data.data.user_id) {
          //     console.log(3);
          //     this.receivedData.push(v.data.data);
          //   }
          // }
          // console.log(this.authenticationService.user);
          // console.log(this.authenticationService.user._value.user.id);
          // console.log(v.data.data.user_id);

          // if (v && v.data.type === 'answer_added') {
          //   console.log(4);
          //
          //   if (this.authenticationService.user.user && this.authenticationService.user.user.id !== v.data.data.user_id) {
          //     console.log(5);
          //     console.log(this.answers.data);
          //     this.answers.data.push(v.data.data);
          //   }
          // }

        }
      );

    this.authenticationService.user$
      .subscribe(el => {
        if (el && el.user.id) {
          this.currentUserId = el.user.id;
          console.log('текущий пользак');
          console.log(this.currentUserId);
        }
      });

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
          console.log(data);
          /////////////////...........КОСТЫЛЬ?
          if(this.answers){
            this.answers.data.push(data);
          }


          // console.log(data.post_id);
        },
        error => console.log(error)
      );
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
      .subscribe((data: any) => {
        console.log(data);
        console.log(this.answers);
        // this.answers = data;
        if (data.data[0]) {
          console.log(123);
          this.answers = data;

        }
        // console.log(this.answers.data);


      });
  }

  getAnswersByLink(link) {
    this.profileService.getAnswersByLink(link)
      .subscribe((data: any) => {
        console.log(data);
        this.answers = data;
      });
  }


  getPostsByLink(link) {
    this.profileService.getPostsByLink(link)
      .subscribe((data: any) => {
        console.log(data);
        this.receivedData = data.data;
      });
  }

  deleteAnswer(postId, answerId) {
    console.log(postId);
    console.log(answerId);

    this.profileService.deleteAnswer(postId, answerId)
      .subscribe((data: any) => {
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
    // this.socketEchoService.subject.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }

    console.log('сработал ондестрой');
  }

}
