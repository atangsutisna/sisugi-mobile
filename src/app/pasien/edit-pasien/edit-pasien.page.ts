import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { GeoService } from 'src/app/geo.service';
import { Kabkota } from 'src/app/kabkota.model';
import { Kecamatan } from 'src/app/kecamatan.model';
import { Kelurahan } from 'src/app/kelurahan.model';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import { Pekerjaan } from 'src/app/pekerjaan.model';
import { Provinsi } from 'src/app/provinsi.model';
import * as moment from 'moment';
import { timeStamp } from 'console';
import { PekerjaanService } from 'src/app/pekerjaan.service';

@Component({
  selector: 'app-edit-pasien',
  templateUrl: './edit-pasien.page.html',
  styleUrls: ['./edit-pasien.page.scss'],
})
export class EditPasienPage implements OnInit {
  id: string;
  pasien: Pasien;
  form: FormGroup;
  listPekerjaan: Array<Pekerjaan> = null;
  listProvinsi: Array<Provinsi> = null;
  listKabkota: Array<Kabkota> = null;
  listKecamatan: Array<Kecamatan> = null;
  listKelurahan: Array<Kelurahan> = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
    private geoService: GeoService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private pekerjaanService: PekerjaanService
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    this.form = new FormGroup({
      nik: new FormControl(null, {
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

        if (this.pasien !== null || this.pasien !== undefined) {
          this.form.patchValue({
            kabkotaId: this.pasien.kabkotaId,
          });
        }
      });
    });

    this.form.get('kabkotaId').valueChanges.subscribe((value) => {
      if (value !== null) {
        this.geoService.kecamatan(value).subscribe((response) => {
          this.form.get('kecamatanId').setValue(null);
          this.form.get('kelurahanId').setValue(null);
          this.listKecamatan = [];
          this.listKecamatan = response;

          if (this.pasien !== null || this.pasien !== undefined) {
            this.form.patchValue({
              kecamatanId: this.pasien.kecamatanId,
            });
          }
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

          if (this.pasien !== null || this.pasien !== undefined) {
            this.form.patchValue({
              kelurahanId: this.pasien.kelurahanId,
            });
          }
        });
      } else {
        console.log('kecamatanId is empty');
      }
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl
      .create({
        message: 'Mohon tunggu',
      })
      .then(async (loading) => {
        loading.present();
        this.listPekerjaan = await this.pekerjaanService.findAll().toPromise();
        this.listProvinsi = await this.geoService.provinsi.toPromise();
        this.pasien = await this.pasienService.fetch(this.id).toPromise();
        console.log(`provinsi id ${this.pasien.provinsiId}`);
        console.log(`jenis kelamin on ionwillenter ${this.pasien.jenisKelamin}`);
        this.form.patchValue({
          nik: this.pasien.nik,
          nama: this.pasien.nama,
          jenisKelamin: this.pasien.jenisKelamin,
          tanggalLahir: this.pasien.tanggalLahir,
          pekerjaan: this.pasien.pekerjaan,
          nohp: this.pasien.nohp,
          jalan: this.pasien.jalan,
          rt: this.pasien.rt,
          rw: this.pasien.rw,
          provinsiId: this.pasien.provinsiId,
        });

        loading.dismiss();
      });
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

  onUpdate() {
    console.log(this.form);
    if (this.form.invalid) {
      this.alert('Warn', 'Data Mohon dilengkapi');
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Mohon tunggu',
      })
      .then((loading) => {
        loading.present();
        const putPasien = {
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
        this.pasienService.update(this.pasien.id, putPasien).subscribe(
          (response) => {
            loading.dismiss();
            this.alert('Info', 'Data pasien suda diupdate');
          },
          (error) => {
            console.log(error);
            loading.dismiss();
            this.alert('Info', 'Failed to update pasien');
          }
        );
      });
  }

  compareProvince(p1: number, p2: number) {
    return p1 == p2;
  }

  compareKabkota(p1: number, p2: number) {
    return p1 == p2;
  }

  compareKecamatan(p1: number, p2: number) {
    return p1 == p2;
  }

  compareKelurahan(p1: number, p2: number) {
    return p1 == p2;
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
