import { LoginService } from './login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PemantauanKesehatan } from './pemantauan-kes.model';
import { PostPemantauanKesehatan } from './post-pemantauan-kes.model';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class PemantauanKesService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {}

  fetchAll(page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const url = environment.apiUri + '/pemantauan-kes?page='+ page +'&size='+ environment.perPage +'&sort=created_at&direction=desc';
    return this.httpClient.get(url, httpOptions).pipe(map((resp: any) => {
      const listPemantauanKes: Array<PemantauanKesehatan> = [];
      for (const pemantauanKes of resp.data) {
        listPemantauanKes.push({
          id: pemantauanKes.id,
          idKontak: pemantauanKes.idkontak,
          nik: pemantauanKes.nik,
          nama: pemantauanKes.nama,
          tanggalPemantauan: pemantauanKes.tanggal_pemantauan,
          kesehatan: pemantauanKes.kesehatan,
          pemantauanTerakhir: pemantauanKes.pemantauan_terakhir,
          status: pemantauanKes.status
        });
      }

      return listPemantauanKes;
    }));

  }

  store(pemantauanKes: PostPemantauanKesehatan) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    let tanggalPemeriksaanRdtAntigen = null;
    let tanggalPemeriksaanRdtAntigen2 = null;
    if (pemantauanKes.pemeriksaanRdtAntigen == true) {
      if (pemantauanKes.tanggalPemeriksaanRdtAntigen != null) {
        tanggalPemeriksaanRdtAntigen = moment(pemantauanKes.tanggalPemeriksaanRdtAntigen).format('YYYY-MM-DD');
      }

      if (pemantauanKes.tanggalPemeriksaanRdtAntigen2 != null) {
        tanggalPemeriksaanRdtAntigen2 = moment(pemantauanKes.tanggalPemeriksaanRdtAntigen2).format('YYYY-MM-DD');
      }
    }

    let tanggalPcr1 = null;
    let tanggalKeluarPcr1 = null;
    let tanggalPcr2 = null;
    let tanggalKeluarPcr2 = null;
    if (pemantauanKes.pcr == true) {
      console.log('convert rt-pcr');
      tanggalPcr1 = moment(pemantauanKes.tanggalPcr1).format('YYYY-MM-DD');
      tanggalKeluarPcr1 = moment(pemantauanKes.tanggalKeluarPcr1).format('YYYY-MM-DD')
      tanggalPcr2 = moment(pemantauanKes.tanggalPcr2).format('YYYY-MM-DD');
      tanggalKeluarPcr2 = moment(pemantauanKes.tanggalKeluarPcr2).format('YYYY-MM-DD')
    }

    const postPemantauanKes = {
      'idkontak': pemantauanKes.idKontak,
      'nik': pemantauanKes.nik,
      'nama': pemantauanKes.nama,
      'tanggal_pemantauan': moment(pemantauanKes.tanggalPemantauan).format('YYYY-MM-DD'),
      'kesehatan': pemantauanKes.kesehatan,
      'pemeriksaan_rdt_antigen': pemantauanKes.pemeriksaanRdtAntigen,
      'tanggal_pemeriksaan_rdt_antigen': tanggalPemeriksaanRdtAntigen,
      'hasil_pemeriksaan_rdt_antigen': pemantauanKes.hasilPemeriksaanRdtAntigen,
      'tanggal_pemeriksaan_rdt_antigen2': tanggalPemeriksaanRdtAntigen2,
      'hasil_pemeriksaan_rdt_antigen2': pemantauanKes.hasilPemeriksaanRdtAntigen2,
      'pcr': pemantauanKes.pcr,
      'tanggalpcr1': tanggalPcr1,
      'tanggalkeluarpcr1': tanggalKeluarPcr1,
      'hasilpcr1': pemantauanKes.hasilPcr1,
      'tanggalpcr2': tanggalPcr2,
      'tanggalkeluarpcr2': tanggalKeluarPcr2,
      'hasilpcr2': pemantauanKes.hasilPcr2,
      'status': pemantauanKes.status,
      'pemantauan_terakhir': pemantauanKes.pemantauanTerakhir,
      'status_akhir': pemantauanKes.statusAkhir,
    }
    return this.httpClient.post<PostPemantauanKesehatan>(environment.apiUri + '/pemantauan-kes', postPemantauanKes, httpOptions);
  }
}
