import { PostIsoman } from './post-isoman.model';
import { Isoman } from './isoman.model';
import { LoginService } from './login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class IsomanService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) { }

  fetchAll(page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const url = environment.apiUri + '/isoman?page='+ page +'&size='+ environment.perPage +'&sort=created_at&direction=desc';
    return this.httpClient.get(url, httpOptions).pipe(map((resp: any) => {
      const isomans: Array<Isoman> = [];
      for (const isoman of resp.data) {
        isomans.push({
          id: isoman.id,
          idKasus: isoman.idkasus,
          nik: isoman.nik,
          nama: isoman.nama,
          kesehatan: isoman.kesehatan,
          tanggalPemantauan: isoman.tanggal_pemantauan,
          pemantauanTerakhir: isoman.pemantauan_terakhir,
          status: isoman.status,
          createdAt: new Date(isoman.created_at),
          updatedAt: new Date(isoman.updated_at)
        });
      }

      return isomans;
    }));
  }

  store(postIsoman: PostIsoman) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const reqBody = {
      pasien_id: postIsoman.pasienId,
      tanggal_pemantauan: moment(postIsoman.tanggalPemantauan).format('YYYY-MM-DD'),
      kesehatan: postIsoman.kesehatan,
      pcr: postIsoman.pcr,
      hasilpcr1: postIsoman.hasilPcr1,
      tanggalpcr1: moment(postIsoman.tanggalPcr1).format('YYYY-MM-DD'),
      tanggalkeluarpcr1: moment(postIsoman.tanggalKeluarPcr1).format('YYYY-MM-DD'),
      hasilpcr2: postIsoman.hasilPcr2,
      tanggalpcr2: moment(postIsoman.tanggalPcr2).format('YYYY-MM-DD'),
      tanggalkeluarpcr2: moment(postIsoman.tanggalKeluarPcr2).format('YYYY-MM-DD'),
      pemantauan_terakhir: postIsoman.pemantauanTerakhir,
      status: postIsoman.status
    };

    return this.httpClient
    .post(environment.apiUri + '/isoman', reqBody, httpOptions);

  }

  fetch(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/isoman/' + id, httpOptions)
      .pipe(
        map((response: any) => {
          const isoman = response.data;
          return {
            id: isoman.id,
            idKasus: isoman.idkasus,
            tanggalWawancara: new Date(isoman.tanggal_wawancara),
            kurvaEpidemiologi: new Date(isoman.kurva_epidemiologi),
            nik: isoman.nik,
            nama: isoman.nama,
            kesehatan: isoman.kesehatan,
            tanggalPemantauan: new Date(isoman.tanggal_pemantauan),
            pcr: String(isoman.pcr),
            hasilPcr1: isoman.hasil_pcr_1,
            tanggalPcr1: new Date(isoman.tanggal_pcr_1),
            tanggalKeluarPcr1: new Date(isoman.tanggal_keluar_pcr_1),
            hasilPcr2: isoman.hasil_pcr_2,
            tanggalPcr2: new Date(isoman.tanggal_pcr_2),
            tanggalKeluarPcr2: new Date(isoman.tanggal_keluar_pcr_2),
            pemantauanTerakhir: isoman.pemantauan_terakhir,
            status: isoman.status
          };
        })
      );
  }

  update(id: string, postIsoman: PostIsoman) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const reqBody = {
      pasien_id: postIsoman.pasienId,
      tanggal_pemantauan: moment(postIsoman.tanggalPemantauan).format('YYYY-MM-DD'),
      kesehatan: postIsoman.kesehatan,
      pcr: postIsoman.pcr,
      hasilpcr1: postIsoman.hasilPcr1,
      tanggalpcr1: moment(postIsoman.tanggalPcr1).format('YYYY-MM-DD'),
      tanggalkeluarpcr1: moment(postIsoman.tanggalKeluarPcr1).format('YYYY-MM-DD'),
      hasilpcr2: postIsoman.hasilPcr2,
      tanggalpcr2: moment(postIsoman.tanggalPcr2).format('YYYY-MM-DD'),
      tanggalkeluarpcr2: moment(postIsoman.tanggalKeluarPcr2).format('YYYY-MM-DD'),
      pemantauan_terakhir: postIsoman.pemantauanTerakhir,
      status: postIsoman.status
    };

    return this.httpClient
    .put(environment.apiUri + '/isoman/'+ id, reqBody, httpOptions);

  }

}
