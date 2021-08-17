import { Component, OnInit } from '@angular/core';
import { PasienService } from 'src/app/pasien.service';
import { Pasien } from 'src/app/pasien.model';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private pasienService: PasienService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });
  }
}
