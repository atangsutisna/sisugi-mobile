import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PenyelidikanEpi } from './../../penyelidikan-epi.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasienService } from 'src/app/pasien.service';
import { CatatanPasien } from 'src/app/catatan-pasien.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-catatan',
  templateUrl: './catatan.page.html',
  styleUrls: ['./catatan.page.scss'],
})
export class CatatanPage implements OnInit {
  catatan: CatatanPasien;
  form: FormGroup;
  constructor(private pasienService: PasienService,
              private activateRoute: ActivatedRoute,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.form = new FormGroup({
      idkasus: new FormControl(null),
      statusEpidemiologi: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    })
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.pasienService.fetchCatatan(id).subscribe(
      (catatan: CatatanPasien) => {
        this.catatan = catatan;
        this.form.patchValue({
          idkasus: catatan.idkasus,
          statusEpidemiologi: catatan.statusEpidemiologi
        })
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
    )

  }

  onSave() {

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
