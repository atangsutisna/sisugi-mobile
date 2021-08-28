import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Pasien } from 'src/app/pasien.model';
import { PasienService } from 'src/app/pasien.service';
import { PenyelidikanEpiService } from 'src/app/pasien/penyelidikan-epi/penyelidikan-epi.service';

@Component({
  selector: 'app-penyelidikan-epi',
  templateUrl: './penyelidikan-epi.page.html',
  styleUrls: ['./penyelidikan-epi.page.scss'],
})
export class PenyelidikanEpiPage implements OnInit {
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
    private activateRoute: ActivatedRoute,
    private pasienService: PasienService,
    private penyelidikanEpiService: PenyelidikanEpiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      tanggalWawancara: new FormControl(null, [
        Validators.required
      ])
    });

  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetch(id).subscribe((pasien) => {
      this.pasien = pasien;
      if (pasien.nik == null ||
          pasien.provinsiId == null ||
          pasien.kabkotaId == null ||
          pasien.kecamatanId == null ||
          pasien.kelurahanId == null) {
          this.confirm('Warn', 'Data pasien belum lengkap. Apakah anda mau melengkapi?');
      }
    });

    this.pasienService.fetchPe(id).subscribe((pe: any) => {
      this.form.patchValue({
        tanggalWawancara: pe.tanggalWawancara
      });
    });
  }

  confirm(inputHeader: string, inputMessage: string) {
    this.alertCtrl
      .create({
        header: inputHeader,
        message: inputMessage,
        buttons: [
          {
            text: 'Ya',
            handler: () => {
              this.router.navigateByUrl('/pasien/edit-pasien/'+ this.pasien.id);
            },
          },
          {
            text: 'Tidak',
            handler: () => {
              this.router.navigateByUrl('/pasien/profile/'+ this.pasien.id);
            },
          },
        ],
      })
      .then((loading) => {
        loading.present();
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

  onSave() {
    if (this.form.invalid) {
      this.alert('Warn', 'Mohon dilengkapi');
      return;
    }

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      const penyelidikanEpi = {
        pasienId: this.pasien.id,
        tanggalWawancara: this.form.value.tanggalWawancara
      };
      this.penyelidikanEpiService.store(penyelidikanEpi).subscribe(
        (resp: any) => {
          loading.dismiss();
          this.router.navigateByUrl('/pasien/informasi-klinis/'+ this.pasien.id);
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

}
