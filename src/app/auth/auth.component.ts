import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User = new User(); // данные вводимого пользователя
  receivedUser: any; // полученный пользователь
  done: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router ) {
  }

  myFirstReactiveForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.myFirstReactiveForm = this.fb.group({

      email: ['test@gmail.com', [
        Validators.required,
        Validators.email,
      ]
      ],
      password: ['12345678', [
        Validators.required
      ]
      ],

    });
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
        (data: any) => {
          this.receivedUser = data;
          this.done = true;
          console.log(this.receivedUser);
          console.log(this.receivedUser.token.access_token);
          localStorage.setItem('access-token', this.receivedUser.token.access_token);
          localStorage.setItem('user', this.receivedUser);
          this.goToProfile();
        },
        error => console.log(error)
      );

  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }


}
