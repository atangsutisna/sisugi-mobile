import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Kegiatan } from 'src/app/kegiatan.model';
import { KontakErat } from 'src/app/kontak-erat.model';
import { KontakEratService } from 'src/app/kontak-erat.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;
  listKegiatan: Array<Kegiatan> = [];
  kontakErat: KontakErat;
  constructor(
    private activateRoute: ActivatedRoute,
    private kontakEratService: KontakEratService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      belumAdaNik: new FormControl(false),
      nik: new FormControl(null),
      nama: new FormControl(null, {
        validators: [Validators.required]
      }),
      jenisKelamin: new FormControl(null, {
        validators: [Validators.required]
      }),
      umur: new FormControl(null, {
        validators: [Validators.required]
      }),
      tanggalKontak: new FormControl(null, {
        validators: [Validators.required]
      }),
      hubungan: new FormControl(null, {
        validators: [Validators.required]
      }),
      ketHubLainnya: new FormControl(null),
      kegiatan: new FormControl(null, {
        validators: [Validators.required]
      }),
      ketKegiatanLainnya: new FormControl(null),
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.kontakEratService.fetchKegiatan()
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.listKegiatan = resp;
        },
        (error: any) => {
          this.alert('Error', 'Internal Server Error');
        }
      );
    this.kontakEratService.fetch(id).subscribe(
      (resp: any) => {
        this.kontakErat = resp;
        this.form.patchValue({
          nik: this.kontakErat.nik,
          belumAdaNik: this.kontakErat.belumAdaNik,
          nama: this.kontakErat.nama,
          jenisKelamin: this.kontakErat.jenisKelamin,
          umur: this.kontakErat.usia,
          tanggalKontak: this.kontakErat.tanggalKontak,
          hubungan: this.kontakErat.hubungan,
          ketHubunganLainnya: this.kontakErat.ketHubunganLainnya,
          kegiatan: this.kontakErat.kegiatan,
          ketKegiatanLainnya: this.kontakErat.ketKegiatanLainnya
        })
      },
      (error) => {
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

  onSave() {
    if (this.form.invalid) {
      this.alert('Warn', 'Data mohon dilengkapi');
      return;
    }

    console.log(this.form);
    if (!this.form.value.belumAdaNik && this.form.value.nik == null) {
      this.alert('Warn', 'NIK mohon diisi');
      return;
    }

    const kontakErat = {
      tanggalKontak: this.form.value.tanggalKontak,
      nik: this.form.value.nik,
      belumAdaNik: this.form.value.belumAdaNik,
      nama: this.form.value.nama,
      umur: this.form.value.umur,
      jenisKelamin: this.form.value.jenisKelamin,
      hubungan: this.form.value.hubungan,
      ketHubLainnya: this.form.value.ketHubunganLainnya,
      kegiatan: this.form.value.kegiatan,
      ketKegiatanLainnya: this.form.value.ketKegiatanLainnya,
    }
    console.log(kontakErat);
    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      this.kontakEratService.update(this.kontakErat.id, kontakErat).subscribe(
        (resp: any) => {
          this.alert('Info', 'Data kontak erat sudah disimpan');
          loading.dismiss();
        },
        (error: any) => {
          loading.dismiss();
          console.log(error);
          if (error.status == 400) {
            const errMessages = error.error.message;
            let message = ''
            for (const error of errMessages) {
              message += error;
              message += '<br/>';
            }
            this.alert('Warn', message);
            return;
          }

          if (error.status == 500) {
            this.alert('Error', 'Internal server error');
          }
        }
      );
    })
  }
}
