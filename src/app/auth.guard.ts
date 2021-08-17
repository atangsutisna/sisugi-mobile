import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  private isLogin = false;

  constructor(private router: Router,
              private loginService: LoginService){}

  canLoad(): boolean {
    const user = this.loginService.getUser().value;
    if (!user.loggedIn) {
      this.router.navigateByUrl('/login');
    }

    return true;
  }

}
