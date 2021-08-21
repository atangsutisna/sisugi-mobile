import { FaktorKontakPaparan } from './faktor-kontak-paparan.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';

@Component({
  selector: 'app-faktor-kontak-paparan',
  templateUrl: './faktor-kontak-paparan.page.html',
  styleUrls: ['./faktor-kontak-paparan.page.scss'],
})
export class FaktorKontakPaparanPage implements OnInit {
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
  faktorKontakPaparan: FaktorKontakPaparan;
  constructor(
    private pasienService: PasienService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      keluarNegeri: new FormControl(null, {
        validators: [Validators.required]
      }),
      transmisiLokal: new FormControl(null, {
        validators: [Validators.required]
      }),
      kunjunganFaskes: new FormControl(null, {
        validators: [Validators.required]
      }),
      pasarHewan: new FormControl(null, {
        validators: [Validators.required]
      }),
      kontakSuspek: new FormControl(null, {
        validators: [Validators.required]
      }),
      kontakKonfirmasi: new FormControl(null, {
        validators: [Validators.required]
      }),
      ispaBerat: new FormControl(null, {
        validators: [Validators.required]
      }),
      petugasKesehatan: new FormControl(null, {
        validators: [Validators.required]
      }),
      apd: new FormControl(null),
      gown: new FormControl(null),
      masker: new FormControl(null),
      sarungTangan: new FormControl(null),
      maskerniosn: new FormControl(null),
      ffp3: new FormControl(null),
      goggle: new FormControl(null),
      tidakMemakaiApd: new FormControl(null)
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });

    this.pasienService.fetchFaktorKontakPaparan(id).subscribe((faktorKontakPaparan) => {
      this.faktorKontakPaparan = faktorKontakPaparan;
      console.log(faktorKontakPaparan);
      this.form.patchValue({
        keluarNegeri: faktorKontakPaparan.keluarNegeri,
        transmisiLokal: faktorKontakPaparan.transmisiLokal,
        kunjunganFaskes: faktorKontakPaparan.kunjunganFaskes,
        pasarHewan: faktorKontakPaparan.pasarHewan,
        kontakSuspek: faktorKontakPaparan.kontakSuspek,
        kontakKonfirmasi: faktorKontakPaparan.kontakKonfirmasi,
        ispaBerat: faktorKontakPaparan.ispaBerat,
        petugasKesehatan: faktorKontakPaparan.petugasKesehatan,
        apd: faktorKontakPaparan.apd,
        gown: faktorKontakPaparan.gown,
        masker: faktorKontakPaparan.masker,
        sarungTangan: faktorKontakPaparan.sarungTangan,
        maskerniosn: faktorKontakPaparan.maskerniosn,
        ffp3: faktorKontakPaparan.ffp3,
        goggle: faktorKontakPaparan.goggle,
        tidakMemakaiApd: faktorKontakPaparan.tidakMemakaiApd,
      });
    });

  }

  onSave() {
    console.log('save to database');
  }
}
