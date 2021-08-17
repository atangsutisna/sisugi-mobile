import { Injectable } from '@angular/core';
import { InformasiKlinis } from './informasi-klinis.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

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

    const reqBody = {};
    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/informasi-klinis',
      reqBody,
      httpOptions
    );
  }
}
