import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { Provinsi } from './provinsi.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Kabkota } from './kabkota.model';
import { Kecamatan } from './kecamatan.model';
import { Kelurahan } from './kelurahan.model';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  constructor(private httpClient: HttpClient,
              private loginService: LoginService) {}

  get provinsi(): Observable<Provinsi[]> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };
    return this.httpClient.get(environment.apiUri + '/provinsi', httpOptions).pipe(
      map((response: any) => {
        const provinces: Array<Provinsi> = [];
        for (const prov of response.data) {
          provinces.push({
            id: prov.id,
            name: prov.nama,
          });
        }

        return provinces;
      })
    );
  }

  kabkota(provinsiId: string): Observable<Kabkota[]> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient
      .get(environment.apiUri + '/provinsi/' + provinsiId + '/kabkota', httpOptions)
      .pipe(
        map((response: any) => {
          const listKabkota: Array<Kabkota> = [];
          for (const kabkota of response.data) {
            listKabkota.push({
              id: kabkota.id,
              name: kabkota.nama,
            });
          }

          return listKabkota;
        })
      );
  }

  kecamatan(kabkotaId: string): Observable<Kecamatan[]> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient
      .get(environment.apiUri + '/kabkota/' + kabkotaId + '/kecamatan', httpOptions)
      .pipe(
        map((response: any) => {
          const listKecamatan: Array<Kecamatan> = [];
          for (const kecamatan of response.data) {
            listKecamatan.push({
              id: kecamatan.id,
              name: kecamatan.nama,
            });
          }

          return listKecamatan;
        })
      );
  }

  kelurahan(kecamatanId: string): Observable<Kelurahan[]> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient
      .get(environment.apiUri + '/kecamatan/' + kecamatanId + '/kelurahan', httpOptions)
      .pipe(
        map((response: any) => {
          const listKelurahan: Array<Kelurahan> = [];
          for (const kelurahan of response.data) {
            listKelurahan.push({
              id: kelurahan.id,
              name: kelurahan.nama,
            });
          }

          return listKelurahan;
        })
      );
  }
}
