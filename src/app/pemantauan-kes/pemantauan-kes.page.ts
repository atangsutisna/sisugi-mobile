import { catchError, timeout } from 'rxjs/operators';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { PemantauanKesService } from './../pemantauan-kes.service';
import { Component, OnInit } from '@angular/core';
import { PemantauanKesehatan } from '../pemantauan-kes.model';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-pemantauan-kes',
  templateUrl: './pemantauan-kes.page.html',
  styleUrls: ['./pemantauan-kes.page.scss'],
})
export class PemantauanKesPage implements OnInit {
  listPemantauanKes: Array<PemantauanKesehatan>;
  page: number = 1;

  constructor(private pemantauanKesService: PemantauanKesService,
              private actionSheetController: ActionSheetController,
              private loadingCtrl: LoadingController,
              private alertCtlr: AlertController) { }

  ionViewWillEnter() {
    this.pemantauanKesService.fetchAll(this.page)
    .subscribe(
      (resp) => {
        this.listPemantauanKes = resp;
      },
      (error) => {
        this.alert('Error', 'Internal Server Error');
      });
  }

  onPageScroll(event) {
    this.page += 1;
    this.pemantauanKesService.fetchAll(this.page).subscribe(resp => {
      this.listPemantauanKes.concat(resp);
      event.target.complete();
    });
  }

  async openActionSheet(id: string, nama: string, idKontak: string) {
    const actionSheet = await this.actionSheetController.create({
      header: idKontak + " - "+ nama,
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked ' + id);
          }
        },
        {
          text: 'Ubah',
          icon: 'create-outline',
          handler: () => {
            console.log('Share clicked ' + id);
          }
        }
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.listPemantauanKes = [];
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

}
