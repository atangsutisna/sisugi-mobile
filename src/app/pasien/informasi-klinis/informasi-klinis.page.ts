import { Component, OnInit } from '@angular/core';
import { PasienService } from 'src/app/pasien.service';
import { Pasien } from 'src/app/pasien.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { InformasiKlinisService } from './informasi-klinis.service';
import { InformasiKlinis } from './informasi-klinis.model';

@Component({
  selector: 'app-informasi-klinis',
  templateUrl: './informasi-klinis.page.html',
  styleUrls: ['./informasi-klinis.page.scss'],
})
export class InformasiKlinisPage implements OnInit {
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
  informasiKlinis: InformasiKlinis;
  form: FormGroup;
  constructor(
    private pasienService: PasienService,
    private activateRoute: ActivatedRoute,
    private informasiKlinisService: InformasiKlinisService,
    private alertCtrl: AlertController,
    private loadinCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      terdapatGejala: new FormControl(null, {
        validators: [Validators.required],
      }),
      tanggalGejala: new FormControl(null, {
        validators: [Validators.required],
      }),
      demam: new FormControl(null),
      batuk: new FormControl(null),
      pilek: new FormControl(null),
      sakitTenggorokan: new FormControl(null),
      sesakNapas: new FormControl(null),
      sakitKepala: new FormControl(null),
      lemas: new FormControl(null),
      nyeriOtot: new FormControl(null),
      mualMuntah: new FormControl(null),
      nyeriAbdomen: new FormControl(null),
      diare: new FormControl(null),
      gangguanMenghidu: new FormControl(null),
      gangguanMengecap: new FormControl(null),
      gejalaLainnya: new FormControl(null),
      ketGejalaLainnya: new FormControl(null),
      hamil: new FormControl(null, {
        validators: [Validators.required],
      }),
      diabetes: new FormControl(null, {
        validators: [Validators.required],
      }),
      penyakitJantung: new FormControl(null, {
        validators: [Validators.required],
      }),
      hipertensi: new FormControl(null, {
        validators: [Validators.required],
      }),
      keganasan: new FormControl(null, {
        validators: [Validators.required],
      }),
      gangguanImmunologi: new FormControl(null, {
        validators: [Validators.required],
      }),
      gagalGinjal: new FormControl(null, {
        validators: [Validators.required],
      }),
      gagalHati: new FormControl(null, {
        validators: [Validators.required],
      }),
      ppok: new FormControl(null, {
        validators: [Validators.required],
      }),
      komorbidLainnya: new FormControl(null, {
        validators: [Validators.required],
      }),
      ketKomorbidLainnya: new FormControl(null),
      dirawatdirs: new FormControl(null, {
        validators: [Validators.required],
      }),
      namars: new FormControl(null),
      tanggalMasukRs: new FormControl(null),
      icu: new FormControl(null),
      inturbasi: new FormControl(null),
      emco: new FormControl(null),
      statusTerakhir: new FormControl(null, {
        validators: [Validators.required],
      }),
      pneumonia: new FormControl(null, {
        validators: [Validators.required],
      }),
      ards: new FormControl(null, {
        validators: [Validators.required],
      }),
      lainnya: new FormControl(null, {
        validators: [Validators.required],
      }),
      ketLainnya: new FormControl(null),
    });

    this.form.get('terdapatGejala').valueChanges.subscribe((value) => {
      if (value == '1') {
        this.form.patchValue({
          tanggalGejala: this.informasiKlinis.tanggalGejala,
          demam: this.informasiKlinis.demam,
          batuk: this.informasiKlinis.batuk,
          pilek:  this.informasiKlinis.pilek,
          sakitTenggorokan:  this.informasiKlinis.sakitTenggorokan,
          sesakNapas:  this.informasiKlinis.sesakNapas,
          sakitKepala:  this.informasiKlinis.sakitKepala,
          lemas:  this.informasiKlinis.lemas,
          nyeriOtot:  this.informasiKlinis.nyeriOtot,
          mualMuntah:  this.informasiKlinis.mualMuntah,
          nyeriAbdomen:  this.informasiKlinis.nyeriAbdomen,
          diare:  this.informasiKlinis.diare,
          gangguanMenghidu:  this.informasiKlinis.gangguanMenghidu,
          gangguanMengecap:  this.informasiKlinis.gangguanMengecap,
          gejalaLainnya:  this.informasiKlinis.gejalaLainnya,
          ketGejalaLainnya:  this.informasiKlinis.ketGejalaLainnya,
        });
      }

      if (value == '0') {
        this.form.patchValue({
          tanggalGejala: null,
          demam: null,
          batuk: null,
          pilek: null,
          sakitTenggorokan: null,
          sesakNapas: null,
          sakitKepala: null,
          lemas: null,
          nyeriOtot: null,
          mualMuntah: null,
          nyeriAbdomen: null,
          diare: null,
          gangguanMenghidu: null,
          gangguanMengecap: null,
          gejalaLainnya: null,
          ketGejalaLainnya: null,
        });
      }
    });

    this.form.get('gejalaLainnya').valueChanges.subscribe((value) => {
      if (value == '1') {
        this.form.patchValue({
          ketGejalaLainnya: this.informasiKlinis.ketGejalaLainnya
        });
      }

      if (value == '0') {
        this.form.patchValue({
          ketGejalaLainnya: null,
        });
      }

    });

    this.form.get('dirawatdirs').valueChanges.subscribe((value) => {
      if (value == '1') {
        this.form.patchValue({
          namars: this.informasiKlinis.namars,
          tanggalMasukRs: this.informasiKlinis.tanggalMasukRs,
          icu: this.informasiKlinis.icu,
          inturbasi: this.informasiKlinis.intubasi,
          emco: this.informasiKlinis.emco,
        });
      }

      if (value == '0') {
        this.form.patchValue({
          namars: null,
          tanggalMasukRs: null,
          icu: null,
          inturbasi: null,
          emco: null
        });
      }

    });

  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe(
      (pasien) => {
        this.pasien = pasien;
      },
      (error) => {
        this.alert('Error', 'Internal Server Error');
      });

    this.pasienService.fetchInformasiKlinis(id).subscribe(
      (informasiKlinis) => {
        this.informasiKlinis = informasiKlinis;
        console.log(informasiKlinis);
        this.form.patchValue({
          terdapatGejala: informasiKlinis.terdapatGejala,
          tanggalGejala: informasiKlinis.tanggalGejala,
          demam: informasiKlinis.demam,
          batuk: informasiKlinis.batuk,
          pilek: informasiKlinis.pilek,
          sakitTenggorokan: informasiKlinis.sakitTenggorokan,
          sesakNapas: informasiKlinis.sesakNapas,
          sakitKepala: informasiKlinis.sakitKepala,
          lemas: informasiKlinis.lemas,
          nyeriOtot: informasiKlinis.nyeriOtot,
          mualMuntah: informasiKlinis.mualMuntah,
          nyeriAbdomen: informasiKlinis.nyeriAbdomen,
          diare: informasiKlinis.diare,
          gangguanMenghidu: informasiKlinis.gangguanMenghidu,
          gangguanMengecap: informasiKlinis.gangguanMengecap,
          gejalaLainnya: informasiKlinis.gejalaLainnya,
          ketGejalaLainnya: informasiKlinis.ketGejalaLainnya,
          hamil: informasiKlinis.hamil,
          diabetes: informasiKlinis.diabetes,
          penyakitJantung: informasiKlinis.penyakitJantung,
          hipertensi: informasiKlinis.hipertensi,
          keganasan: informasiKlinis.keganasan,
          gangguanImmunologi: informasiKlinis.gangguanImmunologi,
          gagalGinjal: informasiKlinis.gagalGinjal,
          gagalHati: informasiKlinis.gagalHati,
          ppok: informasiKlinis.ppok,
          komorbidLainnya: informasiKlinis.komorbidLainnya,
          ketKomorbidLainnya: informasiKlinis.ketKomorbidLainnya,
          dirawatdirs: informasiKlinis.dirawatdirs,
          namars: informasiKlinis.namars,
          tanggalMasukRs: informasiKlinis.tanggalMasukRs,
          icu: informasiKlinis.icu,
          inturbasi: informasiKlinis.intubasi,
          emco: informasiKlinis.emco,
          statusTerakhir: informasiKlinis.statusTerakhir,
          pneumonia: informasiKlinis.pneumonia,
          ards: informasiKlinis.ards,
          lainnya: informasiKlinis.lainnya,
          ketLainnya: informasiKlinis.ketLainnya
        });
      },
      (error) => {
        this.alert('Error', 'Internal Server Error');
      });

  }

  onSave() {
    const errors = this.form.errors;
    console.log(errors);
    /**if (this.form.invalid) {
      this.alert('Warn', 'Mohon dilengkapi');
      return;
    }**/

    this.loadinCtrl
      .create({
        message: 'Mohon tunggu',
      })
      .then((loading) => {
        loading.present();
        const postInformasKlinis = {
          terdapatGejala: this.form.value.terdapatGejala,
          tanggalGejala: this.form.value.tanggalGejala,
          demam: this.form.value.demam,
          batuk: this.form.value.batuk,
          pilek: this.form.value.pilek,
          sakitTenggorokan: this.form.value.sakitTenggorokan,
          sesakNapas: this.form.value.sesakNapas,
          sakitKepala: this.form.value.sakitKepala,
          lemas: this.form.value.lemas,
          nyeriOtot: this.form.value.nyeriOtot,
          mualMuntah: this.form.value.mualMuntah,
          nyeriAbdomen: this.form.value.nyeriAbdomen,
          diare: this.form.value.diare,
          gangguanMenghidu: this.form.value.gangguanMenghidu,
          gangguanMengecap: this.form.value.gangguanMengecap,
          gejalaLainnya: this.form.value.gejalaLainnya,
          ketGejalaLainnya: this.form.value.ketGejalaLainnya,
          hamil: this.form.value.hamil,
          diabetes: this.form.value.diabetes,
          penyakitJantung: this.form.value.penyakitJantung,
          hipertensi: this.form.value.hipertensi,
          keganasan: this.form.value.keganasan,
          gangguanImmunologi: this.form.value.gangguanImmunologi,
          gagalGinjal: this.form.value.gagalGinjal,
          gagalHati: this.form.value.gagalHati,
          ppok: this.form.value.ppok,
          komorbidLainnya: this.form.value.komorbidLainnya,
          ketKomorbidLainnya: this.form.value.ketKomorbidLainnya,
          dirawatdirs: this.form.value.dirawatdirs,
          namars: this.form.value.namars,
          tanggalMasukRs: this.form.value.tanggalMasukRs,
          icu: this.form.value.icu,
          intubasi: this.form.value.inturbasi,
          emco: this.form.value.emco,
          statusTerakhir: this.form.value.statusTerakhir,
          pneumonia: this.form.value.pneumonia,
          ards: this.form.value.ards,
          lainnya: this.form.value.lainnya,
          ketLainnya: this.form.value.ketLainnya,
        };

        this.informasiKlinisService
          .store(this.pasien.id, postInformasKlinis)
          .subscribe(
            (resp: any) => {
              loading.dismiss();
              this.alert('Info', 'Data sudah disimpan');
            },
            (error) => {
              loading.dismiss();
              if (error.status == 401) {
                this.alert('Warn', 'Masa sesi habis, silakan login ulang');
              }

              if (error.status == 500) {
                this.alert('Error', 'Internal Server Error');
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
