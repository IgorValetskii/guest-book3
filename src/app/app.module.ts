import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JWTInterceptor} from './interceptor';
import {WebsocketModule} from './websocket/websocket.module';
import { AnswersComponent } from './answers/answers.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    ProfileComponent,
    AnswersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // WebsocketModule.config({
    //   url: 'https://guest-book.naveksoft.com/broadcasting/auth'
    //   // url: 'wss://echo.websocket.org/'
    // })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
