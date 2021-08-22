import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pasien', url: '/pasien', icon: 'mail' },
    {
      title: 'Penyelidikan Epidemilogi',
      url: '/folder/Penyelidikan-Epidemilogi',
      icon: 'paper-plane',
    },
    { title: 'Isolasi Mandiri', url: '/folder/Isolasi-Mandiri', icon: 'heart' },
    { title: 'Kontak Erat', url: '/folder/Kontak-Erat', icon: 'archive' },
    {
      title: 'Pemantauan Kesehatan',
      url: '/folder/Pemantauan-Kesehatan',
      icon: 'trash',
    },
  ];
  constructor(
    private loginServicec: LoginService,
    private router: Router
  ) {}

  logout() {
    this.loginServicec.logout();
    this.router.navigateByUrl('/login');
  }
}
