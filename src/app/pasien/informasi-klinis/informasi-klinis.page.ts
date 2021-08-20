import { Component, OnInit } from '@angular/core';
import { PasienService } from 'src/app/pasien.service';
import { Pasien } from 'src/app/pasien.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { InformasiKlinisService } from './informasi-klinis.service';

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
      ketKomorbidLainnya: new FormControl(null, {
        validators: [Validators.required],
      }),
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
      ketLainnya: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });

    this.pasienService.fetchPe(id).subscribe((pasien) => {
    });

  }

  onSave() {
    console.log('store on database');
    if (this.form.invalid) {
      this.alert('Warn', 'Mohon dilengkapi');
      return;
    }

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
          intubasi: this.form.value.intubasi,
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
