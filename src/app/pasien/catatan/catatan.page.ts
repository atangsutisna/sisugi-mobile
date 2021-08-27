import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PenyelidikanEpi } from './../../penyelidikan-epi.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasienService } from 'src/app/pasien.service';
import { CatatanPasien } from 'src/app/catatan-pasien.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { StatusEpiService } from './status-epi.service';

@Component({
  selector: 'app-catatan',
  templateUrl: './catatan.page.html',
  styleUrls: ['./catatan.page.scss'],
})
export class CatatanPage implements OnInit {
  catatan: CatatanPasien;
  form: FormGroup;
  id: string;
  backUri = '/pasien/profile/';
  constructor(private pasienService: PasienService,
              private statusEpidService: StatusEpiService,
              private activateRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      idkasus: new FormControl(null),
      statusEpidemiologi: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  ionViewWillEnter() {
    this.id = this.activateRoute.snapshot.params.id;
    this.backUri += this.id;
    this.pasienService.fetchCatatan(this.id).subscribe(
      (catatan: CatatanPasien) => {
        this.catatan = catatan;
        this.form.patchValue({
          idkasus: catatan.idkasus,
          statusEpidemiologi: catatan.statusEpidemiologi
        });
      },
      (error) => {
        if (error.status == 401) {
          this.alert('Warn', 'Masa sesi habis, silakan login ulang');
          return;
        }

        if (error.status == 500) {
          this.alert('Error', 'Internal Server Error');
          return;
        }
      }
    );

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

      this.statusEpidService.store(this.id, {
        statusEpidemiologi: this.form.value.statusEpidemiologi
      }).subscribe(
        (resp: any) => {
          loading.dismiss();
          this.alert('Info', 'Data sudah disimpan');
        },
        (error) => {
          loading.dismiss();
          if (error.status == 401) {
            this.alert('Error', 'Sesi telah habis silakan login ulang');
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
