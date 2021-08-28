import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { PenyelidikanEpi } from './penyelidikan-epi.model';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PenyelidikanEpiService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  store(penyelidikanEpi: PenyelidikanEpi) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const reqBody = {
      'tanggal_wawancara': moment().format('YYYY-MM-DD')
    };
    return this.httpClient.post(
      environment.apiUri + '/pasien/' + penyelidikanEpi.pasienId + '/penyelidikan-epi',
      reqBody,
      httpOptions
    );

  }

}
