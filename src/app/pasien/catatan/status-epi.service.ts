import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { StatusEpid } from './status-epid.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusEpiService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  store(pasienId: string, statusEpid: StatusEpid) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };
    const reqBody = {
      'status_epidemiologi': statusEpid.statusEpidemiologi
    };

    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/informasi-klinis',
      reqBody,
      httpOptions
    );

  }
}
