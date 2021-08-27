import { PenyelidikanEpi } from './penyelidikan-epi.model';
import { Component, OnInit } from '@angular/core';
import { PenyelidikanEpiService } from './penyelidikan-epi.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
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

  async openActionSheet(id: string, nama: string, idKasus: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: idKasus + ' - ' + nama,
      buttons: [
        {
          text: 'Buka',
          icon: 'information-circle-outline',
          handler: () => {
            this.router.navigateByUrl('/pasien/profile/' + id);
          },
        },
      ],
    });

    await actionSheet.present();
    actionSheet.onDidDismiss();
  }
}
