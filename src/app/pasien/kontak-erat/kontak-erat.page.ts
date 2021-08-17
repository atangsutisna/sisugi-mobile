import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KontakErat } from 'src/app/kontak-erat.model';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';

@Component({
  selector: 'app-kontak-erat',
  templateUrl: './kontak-erat.page.html',
  styleUrls: ['./kontak-erat.page.scss'],
})
export class KontakEratPage implements OnInit {
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
  backUri = '/pasien/profile/';
  contacts: Array<KontakErat>;
  constructor(
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      console.log(pasien);
      this.pasien = pasien;
      this.backUri += this.pasien.id;
    });

    this.pasienService.fetchKe(id).subscribe(contacts => {
      this.contacts = contacts;
    });
  }

}
