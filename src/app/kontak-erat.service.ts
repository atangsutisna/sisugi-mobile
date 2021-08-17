import { LoginService } from './login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KontakErat } from './kontak-erat.model';
import { Observable } from 'rxjs';
import { Kegiatan } from './kegiatan.model';
import { PostKontakErat } from './post-kontak-erat.model';

@Injectable({
  providedIn: 'root'
})
export class KontakEratService {

  constructor(private httpClient: HttpClient,
              private loginService: LoginService) { }

  fetchAll(page: number, term?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const apiUri = new URL(environment.apiUri + '/ke');
    apiUri.searchParams.append('page', page.toString());
    apiUri.searchParams.append('size', environment.perPage.toString());
    apiUri.searchParams.append('sort', 'created');
    apiUri.searchParams.append('direction', 'asc');
    if (term !== undefined && term !== '') {
      apiUri.searchParams.append('term', term);
    }
    console.log('apiUri '+ apiUri.href);
    return this.httpClient.get(apiUri.href, httpOptions).pipe(map((response: any) => {
      const contacts : Array<KontakErat> = [];
      for (const ke of response.data) {
        contacts.push({
          id: ke.id,
          idKasus: ke.idkasus,
          idKontak: ke.idkontak,
          tanggalKontak: ke.tanggal_kontak,
          nama: ke.nama,
          nik: ke.nik,
          belumAdaNik: response.data.belum_ada_nik,
          jenisKelamin: ke.jenis_kelamin,
          usia: ke.usia,
          hubungan: ke.hubungan,
          ketHubunganLainnya: ke.ket_hubungan_lainnya,
          kegiatan: ke.kegiatan,
          ketKegiatanLainnya: ke.ket_kegiatan_lainnya,
          createdAt: new Date(ke.created_at),
          updatedAt: new Date(ke.updated_at)
        });
      }

      return contacts;
    }));
  }

  fetch(id: string): Observable<KontakErat> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient.get(environment.apiUri + '/ke/' + id, httpOptions)
      .pipe(map((response: any) => {
        console.log(response.data);
        return {
          id: response.data.id,
          idKasus: response.data.idkasus,
          idKontak: response.data.idkontak,
          tanggalKontak: response.data.tanggal_kontak,
          nama: response.data.nama,
          nik: response.data.nik,
          belumAdaNik: response.data.belum_ada_nik,
          jenisKelamin: response.data.jenis_kelamin,
          usia: response.data.usia,
          hubungan: response.data.hubungan,
          ketHubunganLainnya: response.data.ket_hubungan_lainnya,
          kegiatan: response.data.kegiatan,
          ketKegiatanLainnya: response.data.ket_kegiatan_lainnya,
          createdAt: new Date(response.data.created_at),
          updatedAt: new Date(response.data.updated_at)
        };
    }));

  }

  fetchKegiatan() {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    return this.httpClient.get(environment.apiUri + '/kegiatan', httpOptions)
      .pipe(map((response: any) => {
        const listKegiatan : Array<Kegiatan> = [];
        for (const kegiatan of response.data) {
          listKegiatan.push({
            value: kegiatan.value,
            displayValue: kegiatan.displayValue
          })
        }

        return listKegiatan;
    }));
  }

  store(kontakErat: PostKontakErat) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const reqBody = {
      pasien_id: kontakErat.pasienId,
      tanggal_kontak: kontakErat.tanggalKontak,
      belum_ada_nik: kontakErat.belumAdaNik,
      nik: kontakErat.nik,
      nama: kontakErat.nama,
      umur: kontakErat.umur,
      jenis_kelamin: kontakErat.jenisKelamin,
      hubungan: kontakErat.hubungan,
      ket_hub_lainnya: kontakErat.ketHubLainnya,
      kegiatan: kontakErat.kegiatan,
      ket_keg_lainnya: kontakErat.ketKegiatanLainnya,
    };
    return this.httpClient.post(environment.apiUri + '/ke', reqBody, httpOptions);
  }

  delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient.delete(
      environment.apiUri + '/ke/' + id,
      httpOptions
    );
  }

  update(id: string, kontakErat: PostKontakErat) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const reqBody = {
      pasien_id: kontakErat.pasienId,
      tanggal_kontak: kontakErat.tanggalKontak,
      belum_ada_nik: kontakErat.belumAdaNik,
      nik: kontakErat.nik,
      nama: kontakErat.nama,
      umur: kontakErat.umur,
      jenis_kelamin: kontakErat.jenisKelamin,
      hubungan: kontakErat.hubungan,
      ket_hub_lainnya: kontakErat.ketHubLainnya,
      kegiatan: kontakErat.kegiatan,
      ket_keg_lainnya: kontakErat.ketKegiatanLainnya,
    };

    return this.httpClient.put(environment.apiUri + '/ke/' + id, reqBody, httpOptions);
  }

}
