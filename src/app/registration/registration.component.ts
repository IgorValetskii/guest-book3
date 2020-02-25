import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {HttpService} from '../http.service';
import {User} from '../user';

import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: any; // данные вводимого пользователя
  receivedUser: any; // полученный пользователь
  done = false;
  files: any;

  matcher = new MyErrorStateMatcher();
  private errorEmail: string;
  private errorAvatar: string;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
  }

  mySecondReactiveForm: FormGroup;
  finalData: FormData;

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

    if (this.files) {
      const files: FileList = this.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('avatar', files[i]);
      }
      formData.append('name', this.mySecondReactiveForm.value.name);
      formData.append('email', this.mySecondReactiveForm.value.email);
      formData.append('password', this.mySecondReactiveForm.value.password);
      formData.append('password_confirmation', this.mySecondReactiveForm.value.password_confirmation);
      this.finalData = formData;
    } else {
      this.finalData = this.mySecondReactiveForm.value;
    }

    this.httpService.postNewUser(this.finalData)
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
        error => {
          console.log(error);
          error.error.errors.email ? this.errorEmail = error.error.errors.email[0] : null;
          error.error.errors.avatar ? this.errorAvatar = error.error.errors.avatar[0] : null;
        }
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
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ]
      ]

    }, {validator: this.checkPasswords});
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.mySecondReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  addAvatar(event) {
    const target = event.target;
    this.files = target.files;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group

    const pass = group.get('password').value;
    const confirmPass = group.get('password_confirmation').value;

    return pass === confirmPass ? null : {notSame: true};
  }

}
