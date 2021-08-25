import { Injectable } from '@angular/core';
import { InformasiKlinis } from './informasi-klinis.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class InformasiKlinisService {
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  store(pasienId: string, informasKlinis: InformasiKlinis) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    let tanggalGejala = null;
    if (informasKlinis.tanggalGejala != null) {
      tanggalGejala = moment(informasKlinis.tanggalGejala).format('YYYY-MM-DD');
    }

    let tanggalMasukRs = null;
    if (informasKlinis.tanggalMasukRs != null) {
      tanggalMasukRs = moment(informasKlinis.tanggalMasukRs).format('YYYY-MM-DD');
    }

    const reqBody = {
      'terdapat_gejala': informasKlinis.terdapatGejala,
      'tanggal_gejala': tanggalGejala,
      'demam': informasKlinis.demam,
      'batuk': informasKlinis.batuk,
      'pilek': informasKlinis.pilek,
      'sakit_tenggorokan': informasKlinis.sakitTenggorokan,
      'sesak_napas': informasKlinis.sesakNapas,
      'sakit_kepala': informasKlinis.sakitKepala,
      'lemas': informasKlinis.lemas,
      'nyeri_otot': informasKlinis.nyeriOtot,
      'mual_muntah': informasKlinis.mualMuntah,
      'nyeri_abdomen': informasKlinis.nyeriAbdomen,
      'diare': informasKlinis.diare,
      'gangguan_menghidu': informasKlinis.gangguanMenghidu,
      'gangguan_mengecap': informasKlinis.gangguanMengecap,
      'gejala_lainnya': informasKlinis.gejalaLainnya,
      'ket_gejala_lainnya': informasKlinis.ketGejalaLainnya,
      'hamil': informasKlinis.hamil,
      'diabetes': informasKlinis.diabetes,
      'penyakit_jantung': informasKlinis.penyakitJantung,
      'hipertensi': informasKlinis.hipertensi,
      'keganasan': informasKlinis.keganasan,
      'gangguan_immunologi': informasKlinis.gangguanImmunologi,
      'gagal_ginjal': informasKlinis.gagalGinjal,
      'gagal_hati': informasKlinis.gagalHati,
      'ppok': informasKlinis.ppok,
      'komorbid_lainnya': informasKlinis.komorbidLainnya,
      'ket_komorbid_lainnya': informasKlinis.ketKomorbidLainnya,
      'dirawatdirs': informasKlinis.dirawatdirs,
      'namars': informasKlinis.namars,
      'tanggal_masuk_rs': tanggalMasukRs,
      'icu': informasKlinis.icu,
      'intubasi': informasKlinis.intubasi,
      'emco': informasKlinis.emco,
      'status_terakhir': informasKlinis.statusTerakhir,
      'pneumonia': informasKlinis.pneumonia,
      'ards': informasKlinis.ards,
      'lainnya': informasKlinis.lainnya,
      'ket_lainnya': informasKlinis.ketLainnya,
    };
    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/informasi-klinis',
      reqBody,
      httpOptions
    );
  }
}
