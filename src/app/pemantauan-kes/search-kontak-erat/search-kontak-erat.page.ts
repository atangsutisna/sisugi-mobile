import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { KontakErat } from 'src/app/kontak-erat.model';
import { KontakEratService } from 'src/app/kontak-erat.service';

@Component({
  selector: 'app-search-kontak-erat',
  templateUrl: './search-kontak-erat.page.html',
  styleUrls: ['./search-kontak-erat.page.scss'],
})
export class SearchKontakEratPage implements OnInit {
  contacts: Array<KontakErat>;
  page = 1;

  search: string;
  constructor(private kontakEratService: KontakEratService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      this.kontakEratService.fetchAll(this.page)
      .pipe(catchError(error => {
        return of([]);
      }))
      .subscribe(resp => {
        loading.dismiss();
        this.contacts = resp;
      });
    })
  }

  doSearchKontakErat(event) {
    console.log(event.detail.value);
    this.kontakEratService.fetchAll(this.page, event.detail.value).subscribe(resp => {
      this.contacts = resp;
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

}
