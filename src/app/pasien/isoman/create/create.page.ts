import { IsomanService } from './../../../isoman.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import * as moment from 'moment';

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
  backUri = '/pasien/isoman/';
  form: FormGroup;
  tanggalWawancara: Date;
  kurvaEpidemiologi: Date;
  constructor(
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
    private isomanService: IsomanService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      tanggalPemantauan: new FormControl(null, [
        Validators.required
      ]),
      kesehatan: new FormControl(null, [
        Validators.required
      ]),
      pcr: new FormControl(null, [
        Validators.required
      ]),
      hasilPcr1: new FormControl(null),
      tanggalPcr1: new FormControl(null),
      tanggalKeluarPcr1: new FormControl(null),
      hasilPcr2: new FormControl(null),
      tanggalPcr2: new FormControl(null),
      tanggalKeluarPcr2: new FormControl(null),
      pemantauanTerakhir: new FormControl(null),
      status: new FormControl(null),
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe(
      (pasien) => {
      console.log(pasien);
      this.pasien = pasien;
      this.backUri += this.pasien.id;
      },
      (error) => {
        console.log('Error occur while fetching pasien');
      });
    this.pasienService.fetchPe(id).subscribe(
      (resp: any) => {
        this.tanggalWawancara = resp.tanggalWawancara;
        this.kurvaEpidemiologi = resp.kurvaEpidemiologi;
      },
      (error) => {
        if (error.status == 401) {
          this.alert('Warn', 'Masa sesi habis, silakan login ulang');
          return;
        }

        this.alert('Error', 'Internal Server Error');
      }
    )
  }

  onSave() {
    console.log(this.form);
    if (this.tanggalWawancara == null || this.tanggalWawancara == undefined) {
      this.alert('Warn', 'Penyelidikan Epidemilogi untuk pasien ini tidak ditemukan');
      return;
    }

    if (this.form.invalid) {
      this.alert('Warn', 'Mohon data dilengkapi');
      return;
    }

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      const postIsoman = {
        pasienId: this.pasien.id,
        tanggalPemantauan: this.form.value.tanggalPemantauan,
        kesehatan: this.form.value.kesehatan,
        pcr: this.form.value.pcr,
        hasilPcr1: this.form.value.hasilPcr1,
        tanggalPcr1: this.form.value.tanggalPcr1,
        tanggalKeluarPcr1: this.form.value.tanggalKeluarPcr1,
        hasilPcr2: this.form.value.hasilPcr2,
        tanggalPcr2: this.form.value.tanggalPcr2,
        tanggalKeluarPcr2: this.form.value.tanggalkeluarpcr2,
        status: this.form.value.status,
        pemantauanTerakhir: this.form.value.pemantauanTerakhir,
      };
      this.isomanService.store(postIsoman).subscribe(
        (resp: any) => {
          loading.dismiss();
          this.alert('Info', 'Data sudah disimpan');
          this.form.reset();
        },
        (error) => {
          loading.dismiss();
          if (error.status == 400) {
            const errMessages = error.error.message;
            let message = ''
            if (Array.isArray(errMessages)) {
              for (const error of errMessages) {
                message += error;
                message += '<br/>';
              }
            } else {
              message = errMessages;
            }

            this.alert('Warn', message);
          }

          if (error.status == 401) {
            this.alert('Warn', 'Masa sesi habis, silakan login ulang');
            return;
          }
        }
      );
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
