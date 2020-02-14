import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';

import {AuthenticationService} from './auth.service';
import {loadConfigurationFromPath} from 'tslint/lib/configuration';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
  private publicUrls = ['/login', '/registration'];
  returnUrl: string;

  get user() {
    return this.authenticationService.user;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route, state);

    console.log(12323);

    ////////////если PROFILE
    if (!this.publicUrls.includes(state.url)) {


      this.authenticationService.user$.subscribe(user => {
        if (user) {
          console.log('юзер есть в локалсторадже, переходим на профиль');
          console.log(user);
          return true;
        } else {
          console.log('нету юзера  переходим на логин');
          this.router.navigate(['/login']);

          return false;
          // this.subject.unsubscribe();
        }
      });

      // return true;
// LOGIN REGISTRATION
    } else {
      // console.log( this.authenticationService.user$);
      this.authenticationService.user$
        .subscribe(user => {
          if (user) {
            this.router.navigate(['profile']);
          }

        })
      //
      ;

    }

    return true;


    // const currentUser = this.user;
    // console.log(currentUser);
    //
    // console.log(state.url);
    //
    //
    // if (this.publicUrls.includes(state.url)) {
    //   return true;
    // }
    //

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);


    // redirect to home if already logged in
    // if (this.user) {
    //   console.log('this user' + this.user);
    //   this.router.navigate(['/profile']);
    //   return true;
    // }
    // return false;

    // if (currentUser) {
    //   // logged in so return true
    //   console.log(currentUser);
    //   return true;
    // }
    //
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    //
    // /// Здесь обрубать вебсокет соединение ?
    // return false;
  }
}
