import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Isoman } from 'src/app/isoman.model';
import { IsomanService } from 'src/app/isoman.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  form: FormGroup;
  isoman: Isoman;
  tglWawancara: Date;
  kurvaEpidemiologi: Date;
  constructor(private alertCtrl: AlertController,
              private isomanService: IsomanService,
              private activateRoute: ActivatedRoute,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      tanggalPemantauan: new FormControl(null, [
        Validators.required
      ]),
      kesehatan: new FormControl(null, [
        Validators.required
      ]),
      pcr: new FormControl(null, [
        Validators.required
      ]),
      hasilPcr1: new FormControl(null),
      tanggalPcr1: new FormControl(null),
      tanggalKeluarPcr1: new FormControl(null),
      hasilPcr2: new FormControl(null),
      tanggalPcr2: new FormControl(null),
      tanggalKeluarPcr2: new FormControl(null),
      pemantauanTerakhir: new FormControl(null),
      status: new FormControl(null),
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.alert('Warn', 'Mohon data dilengkapi');
      return;
    }

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      const postIsoman = {
        pasienId: null,
        tanggalPemantauan: this.form.value.tanggalPemantauan,
        kesehatan: this.form.value.kesehatan,
        pcr: this.form.value.pcr,
        hasilPcr1: this.form.value.hasilPcr1,
        tanggalPcr1: this.form.value.tanggalPcr1,
        tanggalKeluarPcr1: this.form.value.tanggalKeluarPcr1,
        hasilPcr2: this.form.value.hasilPcr2,
        tanggalPcr2: this.form.value.tanggalPcr2,
        tanggalKeluarPcr2: this.form.value.tanggalkeluarpcr2,
        status: this.form.value.status,
        pemantauanTerakhir: this.form.value.pemantauanTerakhir,
      };

      this.isomanService.update(this.isoman.id, postIsoman).subscribe(
        (resp: any) => {
          loading.dismiss();
          this.alert('Info', 'Data sudah diupdate');
        },
        (error) => {
          loading.dismiss();
          this.alert('Error', 'Internal Server Error');
        }
      )
    })
  }

  ionViewWillEnter() {
    const id = this.activateRoute.snapshot.params.id;
    this.isomanService.fetch(id).subscribe(
      (resp: any) => {
        this.isoman = resp;
        console.log(resp);
        this.tglWawancara = resp.tanggalWawancara;
        this.kurvaEpidemiologi = resp.kurvaEpidemiologi;
        this.form.patchValue({
          tanggalPemantauan: resp.tanggalPemantauan,
          kesehatan: resp.kesehatan,
          pcr: resp.pcr,
          hasilPcr1: resp.hasilPcr1,
          tanggalPcr1: resp.tanggalPcr1,
          tanggalKeluarPcr1: resp.tanggalKeluarPcr1,
          hasilPcr2: resp.hasilPcr2,
          tanggalPcr2: resp.tanggalPcr2,
          tanggalKeluarPcr2: resp.tanggalKeluarPcr2,
          pemantauanTerakhir: resp.pemantauanTerakhir,
          status: resp.status
        });
      },
      (error) => {
        this.alert('Error', 'Internal Server Error');
      }
    );
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
