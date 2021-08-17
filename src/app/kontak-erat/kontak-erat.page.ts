import { catchError } from 'rxjs/operators';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { KontakEratService } from './../kontak-erat.service';
import { KontakErat } from './../kontak-erat.model';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kontak-erat',
  templateUrl: './kontak-erat.page.html',
  styleUrls: ['./kontak-erat.page.scss'],
})
export class KontakEratPage implements OnInit {
  contacts: Array<KontakErat>;
  page = 1;

  constructor(private kontakEratService: KontakEratService,
              private actionSheetController: ActionSheetController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private router: Router) {}

  ngOnInit() {
    this.contacts = [];
  }

  ionViewWillEnter() {
    this.kontakEratService.fetchAll(this.page)
    .subscribe(
      (resp) => {
        this.contacts = resp;
      },
      (error) => {
        this.alert('Error', 'Error Occur');
      });
  }

  async openActionSheet(id: string, nama: string, idKontak: string) {
    const actionSheet = await this.actionSheetController.create({
      header: idKontak +' - '+ nama,
      buttons: [
        {
          text: 'Ubah',
          icon: 'create-outline',
          handler: () => {
            console.log('Share clicked ' + id);
            this.router.navigateByUrl('/kontak-erat/'+ id + '/edit');
          }
        },
        {
          text: 'Hapus',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.confirm(id);
          }
        },
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async confirm(id: string) {
    const confirm = await this.alertCtrl.create({
      message: 'Apakah Anda Yakin? Jika ya, seluruh data pemantauan akan dihapus',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            console.log('hapus data pasien');
            this.loadingCtrl
              .create({
                message: 'Mohon tunggu',
              })
              .then((loading) => {
                loading.present();
                this.kontakEratService.delete(id).subscribe(
                  (response) => {
                    loading.dismiss();
                    this.showInfoKeDeleted();
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

  async showInfoKeDeleted() {
    const confirm = await this.alertCtrl.create({
      message: 'Data pasien sudah dihapus',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.contacts = [];
            this.kontakEratService.fetchAll(this.page)
            .subscribe(
              (resp) => {
                this.contacts = resp;
              },
              (error) => {
                if (error.status == 500) {
                  this.alert('Error', 'Internal Server Error');
                }
              });
          },
        },
      ],
    });

    confirm.present();
  }

  doSearchKontakErat(event) {
    console.log(event.detail.value);
    this.page = 1;
    this.contacts = [];
    this.kontakEratService.fetchAll(this.page, event.detail.value)
    .subscribe(
      (resp) => {
        this.contacts = resp;
      },
      (error) => {
        if (error.status == 500) {
          this.alert('Error', 'Internal server error');
        } else {
          this.alert('Error', 'Internal server error. Please call the administrator');
        }
      });
  }
}
