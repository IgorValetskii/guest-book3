import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  get currentUser() {
    return this.authenticationService.user;
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

}
