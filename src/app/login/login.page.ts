import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from './login.service';
import { repeat } from 'rxjs/operators';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertCtlr: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  doLogin() {
    const formValue = this.formLogin.value;
    if (formValue.email === null || formValue.password === null) {
      this.alert('Informasi', 'Email atau Password harap diisi');
      return false;
    }

    this.loadingCtrl
      .create({
        message: 'Mohon tunggu',
      })
      .then((loading) => {
        loading.present();
        this.loginService
          .authenticate(formValue.email, formValue.password)
          .subscribe((response: User) => {
            console.log(response);
            if (!response.loggedIn) {
              this.alert('Warning', 'You have entered an invalid username or password');
            }

            loading.dismiss();
            if (response.loggedIn) {
              this.loginService.setLogin(response);
              this.router.navigateByUrl('/home');
            }

          });
      });
  }

  alert(inputHeader: string, inputMessage: string) {
    this.alertCtlr
      .create({
        header: inputHeader,
        message: inputMessage,
        buttons: ['Ok'],
      })
      .then((toast) => {
        toast.present();
      });
  }

  ngOnInit() {}
}
