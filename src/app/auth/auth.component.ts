import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';

import {AuthenticationService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User; // данные вводимого пользователя
  receivedUser: any; // полученный пользователь
  done = false;
  error: any;
  returnUrl: string;
  myFirstReactiveForm: FormGroup;
  incorrectData: false;


  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService
  ) {
  }


  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.myFirstReactiveForm.controls;
  }

  initForm() {
    this.myFirstReactiveForm = this.fb.group({

      email: ['test@gmail.com', [
        Validators.required,
        Validators.email,
      ]
      ],
      password: ['12345678', [
        Validators.required,
        Validators.minLength(8),
      ]
      ],

    });
  }


  onSubmit() {
    const controls = this.myFirstReactiveForm.controls;

    // /** Проверяем форму на валидность */
    if (this.myFirstReactiveForm.invalid) {
      console.log('форма не валидна');
      // /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      // /** Прерываем выполнение метода*/
      return;
    }

    /** TODO: Обработка данных формы */
    // console.log(this.myFirstReactiveForm.value);
    // console.log(this.f.email.value, this.f.password.value);
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/profile']);
        },
        error => {
          this.error = error;
          console.log(this.error.error.errors.credentials[0]);

          if (this.error.error.errors.credentials[0] == 'incorrect credentials') {
            this.incorrectData = this.error.error.errors.credentials[0];
          }
          console.log('неверный пасс');
          // this.loading = false;
        });

  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }


}
