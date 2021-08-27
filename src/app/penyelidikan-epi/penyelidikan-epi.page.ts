import { PenyelidikanEpi } from './penyelidikan-epi.model';
import { Component, OnInit } from '@angular/core';
import { PenyelidikanEpiService } from './penyelidikan-epi.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-penyelidikan-epi',
  templateUrl: './penyelidikan-epi.page.html',
  styleUrls: ['./penyelidikan-epi.page.scss'],
})
export class PenyelidikanEpiPage implements OnInit {
  page = 1;
  penyelidikanEpis: PenyelidikanEpi[];
  constructor(
    private penyelidikanEpiService: PenyelidikanEpiService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.penyelidikanEpis = [];
  }

  ionViewWillEnter() {
    this.page = 1;
    this.penyelidikanEpiService.fetchAll(this.page)
          .subscribe(
            (resp: any) => {
            if (resp.status == 0) {
              this.alert('Error', 'Failed connect to server');
              return;
            }
            this.penyelidikanEpis = resp;
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


}
