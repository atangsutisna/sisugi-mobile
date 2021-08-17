import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Pekerjaan } from './pekerjaan.model';

@Injectable({
  providedIn: 'root',
})
export class PekerjaanService {
  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {}

  findAll() {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient.get(environment.apiUri + '/pekerjaan', httpOptions).pipe(
      map((response: any) => {
        const listPekerjaan: Array<Pekerjaan> = [];
        for (const pekerjaan of response.data) {
          listPekerjaan.push({
            value: pekerjaan.value,
            displayValue: pekerjaan.displayValue,
          });
        }

        return listPekerjaan;
      })
    );
  }
}
