import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PenyelidikanEpi } from './penyelidikan-epi.model';

@Injectable({
  providedIn: 'root'
})
export class PenyelidikanEpiService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  fetchAll(page: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const apiUri = new URL(environment.apiUri + '/pasien');
    apiUri.searchParams.append('page', page.toString());
    apiUri.searchParams.append('size', environment.perPage.toString());
    apiUri.searchParams.append('sort', 'created');
    apiUri.searchParams.append('direction', 'desc');
    console.log('apiUri ' + apiUri.href);
    return this.httpClient.get(apiUri.href, httpOptions).pipe(
      map((response: any) => {
        const penyelidikanEpis: Array<PenyelidikanEpi> = [];
        for (const pe of response.data) {
          penyelidikanEpis.push({
            id: pe.id,
            idKasus: pe.idkasus,
            pasienId: pe.pasien_id,
            pasienNama: pe.pasien_nama,
            tanggalWawancara: new Date(pe.tanggal_wawancara),
            lastStep: null
          });
        }

        return penyelidikanEpis;
      })
    );
  }

}
