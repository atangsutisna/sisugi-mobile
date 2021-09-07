import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PasienService } from 'src/app/pasien.service';
import { VaksinasiPasien } from 'src/app/vaksinasi-vasian.model';
import { VaksinasiService } from './vaksinasi.service';

@Component({
  selector: 'app-vaksinasi',
  templateUrl: './vaksinasi.page.html',
  styleUrls: ['./vaksinasi.page.scss'],
})
export class VaksinasiPage implements OnInit {
  form: FormGroup;
  id: string;
  backUri = '/pasien/profile/';
  constructor(private pasienService: PasienService,
              private vaksinasService: VaksinasiService,
              private activateRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      vaksinasi: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      tglDosis1: new FormControl(null),
      tglDosis2: new FormControl(null),
    });
  }

  ionViewWillEnter() {
    this.id = this.activateRoute.snapshot.params.id;
    this.backUri += this.id;
    this.pasienService.fetchVaksinasi(this.id).subscribe(
      (vaksinasiPasien: VaksinasiPasien) => {
        this.form.patchValue({
          vaksinasi: vaksinasiPasien.vaksinasi,
          tglDosis1: vaksinasiPasien.tglDosis1,
          tglDosis2: vaksinasiPasien.tglDosis2,
        });
      },
      (error) => {
        if (error.status == 401) {
          this.alert('Warn', 'Masa sesi habis, silakan login ulang');
          return;
        }

        if (error.status == 500) {
          this.alert('Error', 'Internal Server Error');
          return;
        }
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

  onSave() {
    if (this.form.invalid) {
      this.alert('Warn', 'Mohon dilengkapi');
      return;
    }

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();

      const vaksinasiPerson = {
        vaksinasi: this.form.value.vaksinasi,
        tglDosis1: this.form.value.tglDosis1,
        tglDosis2: this.form.value.tglDosis2,
      };
      this.vaksinasService.store(this.id, vaksinasiPerson).subscribe(
        (resp: any) => {
          loading.dismiss();
          this.alert('Info', 'Data sudah disimpan');
        },
        (error) => {
          loading.dismiss();
          if (error.status == 401) {
            this.alert('Error', 'Sesi telah habis silakan login ulang');
          }
          if (error.status == 500) {
            this.alert('Error', 'Internal Server Error');
          }

        }
      );
    });
  }

}
