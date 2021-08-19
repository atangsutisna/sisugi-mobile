import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import { InformasiKlinisService } from '../informasi-klinis/informasi-klinis.service';

@Component({
  selector: 'app-informasi-pemeriksaan-penunjang',
  templateUrl: './informasi-pemeriksaan-penunjang.page.html',
  styleUrls: ['./informasi-pemeriksaan-penunjang.page.scss'],
})
export class InformasiPemeriksaanPenunjangPage implements OnInit {
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
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      pemeriksaanRdtAntigen: new FormControl(null, {
        validators: [Validators.required]
      }),
      tanggalPemeriksaanRdtAntigen: new FormControl(null),
      hasilPemeriksaanRdtAntigen: new FormControl(null),
      pemeriksaanRdtAntigen2: new FormControl(null),
      tanggalPemeriksaanRdtAntigen2: new FormControl(null),
      hasilPemeriksaanRdtAntigen2: new FormControl(null),
      spesimen: new FormControl(null, {
        validators: [Validators.required]
      }),
      jenisSpesimen1: new FormControl(null),
      swabNasofaring1: new FormControl(null),
      swabOrofaring1: new FormControl(null),
      sputum1: new FormControl(null),
      serum1: new FormControl(null),
      tanggalPengambilan1: new FormControl(null),
      tanggalPengambilanKeluar1: new FormControl(null),
      hasilPemeriksaanSpesimen1: new FormControl(null),
      jenisSpesimen2: new FormControl(null),
      swabNasofaring2: new FormControl(null),
      swabOrofaring2: new FormControl(null),
      sputum2: new FormControl(null),
      serum2: new FormControl(null),
      tanggalPengambilan2: new FormControl(null),
      tanggalPengambilanKeluar2: new FormControl(null),
      hasilPemeriksaanSpesimen2: new FormControl(null)
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });
  }

  onSave() {
    console.log('save to database');
  }

}
