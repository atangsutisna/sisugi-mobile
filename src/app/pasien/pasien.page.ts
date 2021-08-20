import { catchError } from 'rxjs/operators';
import { PasienService } from './../pasien.service';
import { Component, OnInit } from '@angular/core';
import { Pasien } from '../pasien.model';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasien',
  templateUrl: './pasien.page.html',
  styleUrls: ['./pasien.page.scss'],
})
export class PasienPage implements OnInit {
  page = 1;
  patients: Pasien[];

  constructor(
    private pasienService: PasienService,
    private router: Router,
    private loadingCtlr: LoadingController,
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {}

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

  async openActionSheet(id: string, nama: string, idKasus: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: idKasus + ' - ' + nama,
      buttons: [
        {
          text: 'Info',
          icon: 'information-circle-outline',
          handler: () => {
            this.router.navigateByUrl('/pasien/profile/' + id);
          },
        },
        {
          text: 'Ubah',
          icon: 'create-outline',
          handler: () => {
            this.router.navigateByUrl('/pasien/edit-pasien/' + id);
          },
        },
        {
          text: 'Hapus',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.confirm(id);
          },
        },
      ],
    });

    await actionSheet.present();
    actionSheet.onDidDismiss();
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

  async confirm(id: string) {
    const confirm = await this.alertCtrl.create({
      message: 'Apakah Anda Yakin?',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            console.log('hapus data pasien');
            this.loadingCtlr
              .create({
                message: 'Mohon tunggu',
              })
              .then((loading) => {
                loading.present();
                this.pasienService.delete(id).subscribe(
                  (response) => {
                    loading.dismiss();
                    this.showInfoPasienDeleted();
                  },
                  (error) => {
                    loading.dismiss();
                    console.log(error);
                    if (error.status == 400) {
                      this.alert('Warn', error.error.message);
                    }

                    if (error.status == 500) {
                      this.alert('Error', 'Internal Server Error');
                    }
                  }
                );
              });
          },
        },
        {
          text: 'Tidak',
          handler: () => {
            console.log('Batal menghapus data');
          },
        },
      ],
    });

    confirm.present();
  }

  async showInfoPasienDeleted() {
    const confirm = await this.alertCtrl.create({
      message: 'Data pasien sudah dihapus',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.loadingCtlr
              .create({
                message: 'Mohon tunggu',
              })
              .then((loading) => {
                loading.present();
                this.pasienService
                  .fetchAll(this.page)
                  .pipe(catchError((error) => of([])))
                  .subscribe((resp: any) => {
                    console.log(resp);
                    if (resp.status == 0) {
                      this.alert('Error', 'Failed connect to server');
                      return;
                    }
                    loading.dismiss();
                    this.patients = resp;
                  });
              });
          },
        },
      ],
    });

    confirm.present();
  }
}
