import { Component, OnInit } from '@angular/core';
import { PasienService } from 'src/app/pasien.service';
import { Pasien } from 'src/app/pasien.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private activateRoute: ActivatedRoute
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
  }

  onSave() {
    console.log('store on database');
  }
}
