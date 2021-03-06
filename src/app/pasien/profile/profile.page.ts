import { Component, OnInit } from '@angular/core';
import { Pasien } from 'src/app/pasien.model';
import { ActivatedRoute } from '@angular/router';
import { PasienService } from 'src/app/pasien.service';
import { LoadingController } from '@ionic/angular';
import { PenyelidikanEpi } from 'src/app/penyelidikan-epi.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
  penyelidikanEpi: PenyelidikanEpi = {
    id: null,
    tanggalWawancara: null,
    statusEpidemiologi: null,
    status: null,
    createdAt: null,
    updatedAt: null,
  };
  constructor(
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
    });

    this.pasienService.fetchPe(id).subscribe(
      (penyelidikanEpi) => {
        console.log('Got penyelidikan pe');
        this.penyelidikanEpi = penyelidikanEpi;
      },
      (error) => {
        if (error.status == 404) {
          console.log('Failed to fetch penyelidikan epi');
        } else {
          console.log('Unknown error');
        }
      });
  }

  ionViewWillEnter() {
  }
}
