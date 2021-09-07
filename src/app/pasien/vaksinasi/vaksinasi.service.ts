import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { VaksinasiPasien } from 'src/app/vaksinasi-vasian.model';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class VaksinasiService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) { }

  store(pasienId: string, vaksinasiPasien: VaksinasiPasien) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    let tglDosis1 = null;
    if (vaksinasiPasien.tglDosis1 != null) {
      tglDosis1 = moment(vaksinasiPasien.tglDosis1).format('YYYY-MM-DD');
    }

    let tglDosis2 = null;
    if (vaksinasiPasien.tglDosis2 != null) {
      tglDosis2 = moment(vaksinasiPasien.tglDosis2).format('YYYY-MM-DD');
    }

    const reqBody = {
      'vaksinasi': vaksinasiPasien.vaksinasi,
      'tgl_dosis_1': tglDosis1,
      'tgl_dosis_2': tglDosis2,
    };

    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/vaksinasi',
      reqBody,
      httpOptions
    );

  }
}
