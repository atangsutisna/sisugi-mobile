import { catchError } from 'rxjs/operators';
import { PemantauanKesService } from './../../pemantauan-kes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { KontakErat } from 'src/app/kontak-erat.model';
import { KontakEratService } from 'src/app/kontak-erat.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  kontakErat: KontakErat;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private kontakEratService: KontakEratService,
              private pemantauanKesService: PemantauanKesService,
              private alertCtlr: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router){}

  ngOnInit() {
    this.form = new FormGroup({
      idKontak: new FormControl(null),
      nama: new FormControl(null),
      tanggalKontak: new FormControl(null),
      tanggalPemantauan: new FormControl(null, [
        Validators.required
      ]),
      kesehatan: new FormControl(null, [
        Validators.required
      ]),
      pemeriksaanRdtAntigen: new FormControl(null, [
        Validators.required
      ]),
      tanggalPemeriksaanRdtAntigen: new FormControl(null),
      hasilPemeriksaanRdtAntigen: new FormControl(null),
      tanggalPemeriksaanRdtAntigen2: new FormControl(null),
      hasilPemeriksaanRdtAntigen2: new FormControl(null),
      pcr: new FormControl(null, [
        Validators.required
      ]),
      hasilPcr1: new FormControl(null),
      tanggalPcr1: new FormControl(null),
      tanggalKeluarPcr1: new FormControl(null),
      hasilPcr2: new FormControl(null),
      tanggalPcr2: new FormControl(null),
      tanggalKeluarPcr2: new FormControl(null),
      status: new FormControl(null, [
        Validators.required
      ]),
      pemantauanTerakhir: new FormControl(null),
      statusAkhir: new FormControl(null),
    });

    const kontakId = this.activatedRoute.snapshot.params.kontakId;

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      this.kontakEratService.fetch(kontakId)
        .subscribe((kontakErat: KontakErat) => {
          loading.dismiss();
          this.kontakErat = kontakErat;
          this.form.patchValue({
            idKontak: kontakErat.idKontak,
            tanggalKontak: kontakErat.tanggalKontak,
            nama: kontakErat.nama
          })
        });
    })

  }

  onSave() {
    console.log(this.form);
    if (this.form.invalid) {
      this.alert('Peringatan', 'Mohon dilengkapi');
      return;
    }

    const pemantauanKes = {
      idKontak: this.kontakErat.idKontak,
      nik: this.kontakErat.nik,
      nama: this.kontakErat.nama,
      tanggalPemantauan: this.form.value.tanggalPemantauan,
      kesehatan: this.form.value.kesehatan,
      pemeriksaanRdtAntigen: this.form.value.pemeriksaanRdtAntigen,
      tanggalPemeriksaanRdtAntigen: this.form.value.tanggalPemeriksaanRdtAntigen,
      hasilPemeriksaanRdtAntigen: this.form.value.hasilPemeriksaanRdtAntigen,
      tanggalPemeriksaanRdtAntigen2: this.form.value.hasilPemeriksaanRdtAntigen2,
      hasilPemeriksaanRdtAntigen2: this.form.value.hasilPemeriksaanRdtAntigen2,
      pcr: this.form.value.pcr,
      hasilPcr1: this.form.value.hasilPcr1,
      tanggalPcr1: this.form.value.tanggalPcr1,
      tanggalKeluarPcr1: this.form.value.tanggalKeluarPcr1,
      hasilPcr2: this.form.value.hasilPcrr2,
      tanggalPcr2: this.form.value.tanggalPcr2,
      tanggalKeluarPcr2: this.form.value.tanggalKeluarPcr2,
      status: this.form.value.status,
      pemantauanTerakhir: this.form.value.pemantauanTerakhir,
      statusAkhir: this.form.value.statusAkhir,
    };

    this.loadingCtrl.create({
      message: 'Mohon tunggu'
    }).then(loading => {
      loading.present();
      this.pemantauanKesService
        .store(pemantauanKes)
        .pipe(catchError(error => {
          return of({
            'status': error.status,
            'message': error.error.message
          });
        }))
        .subscribe((response: any) => {
          loading.dismiss();
          if (response.status == 500) {
            this.alert('Error', 'Internal server error, segera hubungi admin');
            return;
          }

          if (response.status == 400) {
            this.alert('Peringatan', response.message);
            return;
          }

          this.alert('Info', 'Data pemantauan sudah disimpan');
          this.router.navigateByUrl('/pemantauan-kes');
        });
    });
  }

  alert(inputHeader: string, inputMessage: string) {
    this.alertCtlr
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
