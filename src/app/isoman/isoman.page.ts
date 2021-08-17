import { IsomanService } from './../isoman.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Isoman } from '../isoman.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-isoman',
  templateUrl: './isoman.page.html',
  styleUrls: ['./isoman.page.scss'],
})
export class IsomanPage implements OnInit {
  isomans: Array<Isoman>;
  page: number = 1;

  constructor(
    private serviceService: IsomanService,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.serviceService.fetchAll(this.page)
    .subscribe(
      (resp) => {
        this.isomans = resp;
      },
      (error) => {
        if (error.status == 401) {
          this.alert('Warn', 'Masa sesi habis, silakan login ulang');
          return;
        }

        this.alert('Error', 'Internal Server Error');
      });
  }

  onPageScroll(event) {
    this.page += 1;
    this.serviceService.fetchAll(this.page).subscribe(resp => {
      this.isomans.concat(resp);
      event.target.complete();
    });
  }

  async openActionSheet(id: string, nama: string) {
    const actionSheet = await this.actionSheetController.create({
      header: nama,
      buttons: [
        {
          text: 'Ubah',
          icon: 'create-outline',
          handler: () => {
            console.log('Share clicked ' + id);
            this.router.navigateByUrl("isoman/"+ id + "/edit");
          }
        },
        {
          text: 'Hapus',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked ' + id);
            this.alert('Info', 'Sorry, not implemented yet');
          }
        },
      ]
    });

    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.isomans = [];
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
