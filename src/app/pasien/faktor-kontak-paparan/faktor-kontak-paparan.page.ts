import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  constructor(
    private pasienService: PasienService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
    });
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });
  }

}
