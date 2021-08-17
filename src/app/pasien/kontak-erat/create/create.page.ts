import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import { Pekerjaan } from 'src/app/pekerjaan.model';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { KontakEratService } from 'src/app/kontak-erat.service';
import { Kegiatan } from 'src/app/kegiatan.model';
import { throwIfEmpty } from 'rxjs/operators';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  pasien: Pasien = {
    id: null,
    idKasus: null,
    puskesmasId: null,
    puskesmasNama: null,
    nik: null,
    nama: null,
    vaksinasi: null,
    tglDosis1: null,
    tglDosis2: null,
    tanggalLahir: null,
    jenisKelamin: null,
    kewarganegaraan: null,
    pekerjaan: null,
    ketPekerjaanLainnya: null,
    nohp: null,
    jalan: null,
    rt: null,
    rw: null,
    kelurahanId: null,
    kelurahanNama: null,
    kecamatanId: null,
    kecamatanNama: null,
    kabkotaId: null,
    kabkotaNama: null,
    provinsiId: null,
    provinsiNama: null,
    latitude: null,
    longitude: null,
    statusEpidemiologi: null,
    statusAkhir: null,
    updatedAt: null,
    createdAt: null,
  };
  backUri = '/pasien/kontak-erat/';
  form: FormGroup;
  listPekerjaan: Array<Pekerjaan> = null;
  listKegiatan: Array<Kegiatan> = null;
  constructor(
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
    private kontaEratService: KontakEratService,
    private toastCtrl: ToastController,
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
    this.pasienService.fetch(id).subscribe((pasien) => {
      console.log(pasien);
      this.pasien = pasien;
      this.backUri += this.pasien.id;
    });

    this.kontaEratService.fetchKegiatan()
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.listKegiatan = resp;
        },
        (error: any) => {
          console.log('error occur');
        }
      );
  }

  showToast(inputHeader: string, inputMessage: string) {
    this.toastCtrl
      .create({
        header: inputHeader,
        message: inputMessage,
        duration: 2000,
      })
      .then((toast) => {
        toast.present();
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
      pasienId: this.pasien.id,
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
      this.kontaEratService.store(kontakErat).subscribe(
        (resp: any) => {
          this.alert('Info', 'Data kontak erat sudah disimpan');
          this.form.reset();
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
