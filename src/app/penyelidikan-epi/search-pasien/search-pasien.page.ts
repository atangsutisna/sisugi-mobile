import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';

@Component({
  selector: 'app-search-pasien',
  templateUrl: './search-pasien.page.html',
  styleUrls: ['./search-pasien.page.scss'],
})
export class SearchPasienPage implements OnInit {
  page = 1;
  patients: Pasien[];

  constructor(
    private pasienService: PasienService,
    private router: Router,
    private loadingCtlr: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.patients = [];
  }

  ionViewWillEnter() {
    this.page = 1;
    this.pasienService.fetchAll(this.page)
          .subscribe(
            (resp: any) => {
            console.log(resp);
            if (resp.status == 0) {
              this.alert('Error', 'Failed connect to server');
              return;
            }
            this.patients = resp;
            },
            (error) => {
              console.log(error);
              if (error.status == 401) {
                this.alert('Warn', 'Masa sessi habis, silakan login ulang');
                return;
              }

              this.alert('Error', 'Internal Server Error');
            }
          );
  }

  onPageScroll(event) {
    this.page += 1;
    this.pasienService.fetchAll(this.page).subscribe((resp) => {
      this.patients.concat(resp);
      event.target.complete();
    });
  }

  alert(inputHeader: string, inputMessage: string) {
    this.alertCtrl
      .create({
        header: inputHeader,
        message: inputMessage,
        buttons: ['Ok'],
      })
      .then((toast) => {
        toast.present();
      });
  }

  doSearchPatient(event) {
    console.log(event.detail.value);
    this.page = 1;
    this.patients = [];
    this.pasienService
          .fetchAll(this.page, event.detail.value)
          .subscribe(
            (resp: any) => {
              if (resp.status == 0) {
                this.alert('Error', 'Failed connect to server');
                return;
              }
              this.patients = resp;
            },
            (error) => {
              this.alert('Error', 'Internal Server Error');
            }
          );
  }

}
