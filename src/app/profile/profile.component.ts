import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {WebsocketService} from '../websocket/websocket.service';
import {WS} from '../websocket/websocket.events';

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

  constructor(private fb: FormBuilder, private httpService: HttpService, private wsService: WebsocketService) {
    this.wsService.on<IMessage[]>('messages')
      .subscribe((messages: IMessage[]) => {
        console.log(messages);

        this.wsService.send('text', 'Test Text!');
      });
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
          console.log(this.recievedData);
          console.log(this.recievedData.data[0].user.name);

          this.posts = this.recievedData.data;

          this.userName = localStorage.getItem('user');
          // console.log(this.userName);


    },
      error => console.log(error)
      );

    this.initForm();
  }

  initForm() {
    this.messageReactiveForm = this.fb.group({

      message: ['Hello all !', [
        Validators.required,
      ]
      ],
    });
  }

  onSubmit(){
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
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.messageReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }


}
