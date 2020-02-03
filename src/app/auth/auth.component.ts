import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User = new User(); // данные вводимого пользователя
  receivedUser: User; // полученный пользователь
  done: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
  }

  myFirstReactiveForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }


  onSubmit() {
    const controls = this.myFirstReactiveForm.controls;

    /** Проверяем форму на валидность */
    if (this.myFirstReactiveForm.invalid) {
      console.log('форма не валдина');
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    console.log(this.myFirstReactiveForm.value);

    this.httpService.postUser(this.myFirstReactiveForm.value)
      .subscribe(
        (data: User) => {
          this.receivedUser = data;
          this.done = true;
          console.log(this.receivedUser);
        },
        error => console.log(error)
      );

  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }


  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      email: ['test@gmail.com', [
        Validators.required, Validators.email
      ]
      ],
      password: ['12345678', [
        Validators.required
      ]
      ],

    });
  }


}
