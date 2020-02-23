import {Component, OnInit} from '@angular/core';
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

  user: any; // данные вводимого пользователя
  receivedUser: any; // полученный пользователь
  done = false;

  constructor(private fb: FormBuilder, private httpService: HttpService,  private router: Router) {
  }

  mySecondReactiveForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const controls = this.mySecondReactiveForm.controls;

    // /** Проверяем форму на валидность */
    if (this.mySecondReactiveForm.invalid) {
      console.log('форма не валдина');
      // /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      // /** Прерываем выполнение метода*/
      return;
    }

    // /** TODO: Обработка данных формы */
    console.log(this.mySecondReactiveForm.value);

    this.httpService.postNewUser(this.mySecondReactiveForm.value)
      .subscribe(
        (data: any) => {
          this.receivedUser = data;
          this.done = true;
          console.log(this.receivedUser);
          // this.avatar = data.avatar;
          this.router.navigate(['/profile']);
          // console.log(this.receivedUser.token.access_token);
          // localStorage.setItem('access-token', this.receivedUser.token.access_token);
        },
        error => console.log(error)
      );

  }

  initForm() {
    this.mySecondReactiveForm = this.fb.group({

      avatar: [null],

      name: ['vasya', [
        Validators.required,
        Validators.pattern(/[A-z]/),
        Validators.maxLength(255)
      ]
      ],
      email: ['test@gmail.com', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]
      ],
      password: ['12345678', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]
      ],
      password_confirmation: ['12345678', [
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
