import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AnswersService} from './answers.service';
import {HttpService} from '../http.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  post: any;
  receivedData: any;
  author: boolean;

  // get receivedData() {
  //   return this.post ? this.post.data : undefined;
  // }

  get userName(): string {
    return localStorage.getItem('user');
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private answersService: AnswersService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {
  }

  answerReactiveForm: FormGroup;

  ngOnInit() {
    this.getAnswer();
    this.initForm();
  }

  getAnswer() {
    const postId = +this.route.snapshot.paramMap.get('id');
    console.log(postId);
    this.profileService.getAnswers(postId)
      .subscribe(
        (data: any) => {
          this.receivedData = data.data;
          console.log(data);
          console.log(this.receivedData[0].user_id);
          this.answersService.checkUser2(this.receivedData) ? this.author = true : this.author = false;
        },
        error => console.log(error)
      );
    // this.answersService.getPost(id)
    //   .subscribe(post => this.post = post);
  }

  initForm() {

    this.answerReactiveForm = this.fb.group({

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
    const controls = this.answerReactiveForm.controls;
    const postId = +this.route.snapshot.paramMap.get('id');

    /** Проверяем форму на валидность */
    if (this.answerReactiveForm.invalid) {
      console.log('форма не валдина');
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.answerReactiveForm.value);

    // отправляет ответ на отзыв /////////////////////////////////////////////
    this.profileService.postAnswer(this.answerReactiveForm.value, postId)
      .subscribe(
        (data: any) => {
          this.receivedData.push(data);
          // this.done = true;
          console.log(data);

          console.log(data.post_id);

          // this.postId = this.receivedData.post_id;

          // console.log(this.postId === this.receivedMessage.post_id);
        },
        error => console.log(error)
      );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.answerReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  checkUser() {
    return this.answersService.checkUser();
  }

  // checkUser2(data: any){
  //   return this.answersService.checkUser2(data);
  // }

  deleteAnswer(answerId) {
    console.log(answerId);
    // const answer = answerId;
    const postId = +this.route.snapshot.paramMap.get('id');
    this.profileService.deleteAnswer(postId, answerId)
      .subscribe((data: any) => {
          const result = this.receivedData.filter(el => el.id !== answerId);
          this.receivedData = result;
          // console.log(result);
          // console.log(this.receivedData);
          // console.log(data);
        },
        error => console.log(error)
      );
  }

  logout() {
    localStorage.clear();
    this.goToLoggin();
  }

  goToLoggin() {
    this.router.navigate(['login']);
  }
}

