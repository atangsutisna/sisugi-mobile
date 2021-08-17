import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PekerjaanService } from 'src/app/pekerjaan.service';
import { Pekerjaan } from 'src/app/pekerjaan.model';
import { GeoService } from 'src/app/geo.service';
import { Provinsi } from 'src/app/provinsi.model';
import { Kabkota } from 'src/app/kabkota.model';
import { Kecamatan } from 'src/app/kecamatan.model';
import { Kelurahan } from 'src/app/kelurahan.model';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { PasienService } from 'src/app/pasien.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-pasien',
  templateUrl: './create-pasien.page.html',
  styleUrls: ['./create-pasien.page.scss'],
})
export class CreatePasienPage implements OnInit {
  form: FormGroup;
  listPekerjaan: Array<Pekerjaan> = null;
  listProvinsi: Array<Provinsi> = null;
  listKabkota: Array<Kabkota> = null;
  listKecamatan: Array<Kecamatan> = null;
  listKelurahan: Array<Kelurahan> = null;

  constructor(
    private alertCtrl: AlertController,
    private pekerjaanService: PekerjaanService,
    private geoService: GeoService,
    private toastCtrl: ToastController,
    private pasienService: PasienService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nik: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      nama: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      jenisKelamin: new FormControl(null, {
        validators: [Validators.required],
      }),
      tanggalLahir: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      pekerjaan: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      nohp: new FormControl(null),
      jalan: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      rt: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      rw: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      kelurahanId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      kecamatanId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      kabkotaId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      provinsiId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });

    this.form.get('provinsiId').valueChanges.subscribe((value) => {
      this.geoService.kabkota(value).subscribe((response) => {
        this.form.get('kabkotaId').setValue(null);
        this.form.get('kecamatanId').setValue(null);
        this.form.get('kelurahanId').setValue(null);
        this.listKabkota = [];
        this.listKabkota = response;
      });
    });

    this.form.get('kabkotaId').valueChanges.subscribe((value) => {
      if (value !== null) {
        this.geoService.kecamatan(value).subscribe((response) => {
          this.form.get('kecamatanId').setValue(null);
          this.form.get('kelurahanId').setValue(null);
          this.listKecamatan = [];
          this.listKecamatan = response;
        });
      } else {
        console.log('kabkotaId is empty');
      }
    });

    this.form.get('kecamatanId').valueChanges.subscribe((value) => {
      if (value !== null) {
        this.geoService.kelurahan(value).subscribe((response) => {
          this.form.get('kelurahanId').setValue(null);
          this.listKelurahan = [];
          this.listKelurahan = response;
        });
      } else {
        console.log('kecamatanId is empty');
      }
    });
  }

  onSave() {
    console.log(this.form);
    if (!this.form.valid) {
      this.alert('Peringatan', 'Mohon dilengkapi');
      return false;
    }

    this.loadingCtrl
      .create({
        message: 'Mohon tunggu',
      })
      .then((loading) => {
        loading.present();
        const postPasien = {
          nik: this.form.value.nik,
          nama: this.form.value.nama,
          tanggalLahir: moment(this.form.value.tanggalLahir).format(
            'YYYY-MM-DD'
          ),
          jenisKelamin: this.form.value.jenisKelamin,
          pekerjaan: this.form.value.pekerjaan,
          jalan: this.form.value.jalan,
          rt: this.form.value.rt,
          rw: this.form.value.rw,
          warga: 'Indonesia',
          provinsiId: this.form.value.provinsiId,
          kabkotaId: this.form.value.kabkotaId,
          kecamatanId: this.form.value.kecamatanId,
          kelurahanId: this.form.value.kelurahanId,
          nohp: this.form.value.nohp,
        };
        this.pasienService.store(postPasien).subscribe(
          (response) => {
            loading.dismiss();

            this.alert('Info', 'Data pasien sudah disimpan');
            this.form.reset();
          },
          (error) => {
            loading.dismiss();

            if (error.status == 400) {
              this.alert('Warn', error.error.message);
            }

            if (error.status == 500) {
              this.alert('Error', 'Internal Server Error');
            }

            console.log(error);
            console.log('Error occur');
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

  ionViewWillEnter() {
    this.geoService.provinsi.subscribe(
      (response) => {
        this.listProvinsi = response;
      },
      (error) => {
        if (error.status == 401) {
          this.showToast(
            'Error',
            'Failed to fetch provinces, sesi telah habis silakan login ulang'
          );
        }
      }
    );

    this.pekerjaanService.findAll().subscribe(
      (response: any) => {
        this.listPekerjaan = response;
      },
      (error) => {
        if (error.status == 401) {
          this.showToast(
            'Error',
            'Failed to fetch pekerjaan, sesi telah habis silakan login ulang'
          );
        }
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
}
