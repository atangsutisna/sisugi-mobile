import { InformasiPemeriksaanPenunjang } from './informasi-pemeriksaan-penunjang.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import { InformasiPemeriksaanPenunjangService } from './informasi-pemeriksaan-penunjang.service';

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
  informasiPemeriksaanPenunjang: InformasiPemeriksaanPenunjang;
  constructor(
    private pasienService: PasienService,
    private activateRoute: ActivatedRoute,
    private informasPemeriksaanPenunjangService: InformasiPemeriksaanPenunjangService,
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

    this.pasienService.fetchInformasiPemeriksaanPenunjang(id)
    .subscribe((informasiPemeriksaanPenunjang) => {
      console.log(informasiPemeriksaanPenunjang);
      this.informasiPemeriksaanPenunjang = informasiPemeriksaanPenunjang;
      this.form.patchValue({
        pemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.pemeriksaanRdtAntigen,
        tanggalPemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen,
        hasilPemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.hasilPemeriksaanRdtAntigen,
        tanggalPemeriksaanRdtAntigen2: informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen2,
        hasilPemeriksaanRdtAntigen2: informasiPemeriksaanPenunjang.hasilPemeriksaanRdtAntigen2,
        spesimen: informasiPemeriksaanPenunjang.spesimen,
        jenisSpesimen1: informasiPemeriksaanPenunjang.jenisSpesimen1,
        swabOrofaring1: informasiPemeriksaanPenunjang.swabOrofaring1,
        swabNasofaring1: informasiPemeriksaanPenunjang.swabNasofaring1,
        sputum1: informasiPemeriksaanPenunjang.sputum1,
        serum1: informasiPemeriksaanPenunjang.serum1,
        tanggalPengambilan1: informasiPemeriksaanPenunjang.tanggalPengambilan1,
        tanggalPengambilanKeluar1: informasiPemeriksaanPenunjang.tanggalPengambilanKeluar1,
        hasilPemeriksaanSpesimen1: informasiPemeriksaanPenunjang.hasilPemeriksaanSpesimen1,
        jenisSpesimen2: informasiPemeriksaanPenunjang.jenisSpesimen2,
        swabOrofaring2: informasiPemeriksaanPenunjang.swabOrofaring2,
        swabNafofaring2: informasiPemeriksaanPenunjang.swabNasofaring2,
        sputum2: informasiPemeriksaanPenunjang.sputum2,
        serum2: informasiPemeriksaanPenunjang.serum2,
        tanggalPengambilan2: informasiPemeriksaanPenunjang.tanggalPengambilan2,
        tanggalPengambilanKeluar2: informasiPemeriksaanPenunjang.tanggalPengambilanKeluar2,
        hasilPemeriksaanSpesimen2: informasiPemeriksaanPenunjang.hasilPemeriksaanSpesimen2,
      });
    });

  }

  onSave() {
    this.loadinCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      const infoPemeriksaanPenunjang = {
        pemeriksaanRdtAntigen: this.form.value.pemeriksaanRdtAntigen,
        tanggalPemeriksaanRdtAntigen: this.form.value.tanggalPemeriksaanRdtAntigen,
        hasilPemeriksaanRdtAntigen: this.form.value.hasilPemeriksaanRdtAntigen,
        tanggalPemeriksaanRdtAntigen2: this.form.value.tanggalPemeriksaanRdtAntigen2,
        hasilPemeriksaanRdtAntigen2: this.form.value.hasilPemeriksaanRdtAntigen2,
        spesimen: this.form.value.spesimen,
        jenisSpesimen1: this.form.value.jenisSpesimen1,
        swabNasofaring1: this.form.value.swabNasofaring1,
        swabOrofaring1: this.form.value.swabOrofaring1,
        sputum1: this.form.value.sputum1,
        serum1: this.form.value.serum1,
        tanggalPengambilan1: this.form.value.tanggalPengambilan1,
        tanggalPengambilanKeluar1: this.form.value.tanggalPengambilanKeluar1,
        hasilPemeriksaanSpesimen1: this.form.value.hasilPemeriksaanSpesimen1,
        jenisSpesimen2: this.form.value.jenisSpesimen2,
        swabNasofaring2: this.form.value.swabNasofaring2,
        swabOrofaring2: this.form.value.swabOrofaring2,
        sputum2: this.form.value.sputum2,
        serum2: this.form.value.serum2,
        tanggalPengambilan2: this.form.value.tanggalPengambilan2,
        tanggalPengambilanKeluar2: this.form.value.tanggalPengambilanKeluar2,
        hasilPemeriksaanSpesimen2: this.form.value.hasilPemeriksaanSpesimen2
      };
      console.log(infoPemeriksaanPenunjang);
      this.informasPemeriksaanPenunjangService
      .store(this.pasien.id, infoPemeriksaanPenunjang)
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
