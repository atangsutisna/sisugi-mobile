import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../user.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
    this.user.next({
      loggedIn: true,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzaXN1Z2ktZm9ybTIudGVzdCIsImV4cCI6MTYzMDE2NDk4MywidXNlcl9pZCI6Mzk1LCJwdXNrZXNtYXNfaWQiOjI4NDV9.8MpN3hTGpxGl2OGQwdQiWvjGQAdgFHjTcdyyWikKw4EsG6vL2sAn593jvAGQwv-dOCMMOMjv616A-IabYwGtcg'
    });
  }

  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(environment.apiUri + '/auth', {
        email: email,
        password: password,
      })
      .pipe(
        map((response: any) => {
          console.log('login success');
          console.log(response.token);
          return {
            loggedIn: true,
            token: response.token,
          };
        }),
        catchError((error) => {
          return of({
            loggedIn: false,
            token: null,
          });
        })
      );
  }

  logout() {
    this.user.next(null);
  }

  setLogin(loggedIn: User) {
    this.user.next(loggedIn);
  }

  getUser() {
    return this.user;
  }
}
