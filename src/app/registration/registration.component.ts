import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';

import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: User = new User(); // данные вводимого пользователя
  receivedUser: User; // полученный пользователь
  done: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) { }
  mySecondReactiveForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const controls = this.mySecondReactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.mySecondReactiveForm.invalid) {
      console.log('форма не валдина');
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.mySecondReactiveForm.value);

    this.httpService.postNewUser(this.mySecondReactiveForm.value)
      .subscribe(
        (data: User) => {
          this.receivedUser = data;
          this.done = true;
          // console.log(this.receivedUser);
          console.log(this.receivedUser.token.access_token);
          localStorage.setItem('access-token', this.receivedUser.token.access_token);
        },
        error => console.log(error)
      );

  }

  initForm(){
    this.mySecondReactiveForm = this.fb.group({

      avatar: [null, Validators.required],

      name: ['vasya',[
        Validators.required,
        Validators.pattern(/[A-z]/)
      ]
      ],
      email: ['test@gmail.com',[
        Validators.required, Validators.email
      ]
      ],
      password: ['12345678',[
        Validators.required
      ]
      ],
      password_confirmation: ['12345678',[
        Validators.required
      ]
      ]

    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.mySecondReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

}
