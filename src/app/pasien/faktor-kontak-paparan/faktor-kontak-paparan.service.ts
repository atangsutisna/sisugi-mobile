import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { FaktorKontakPaparan } from './faktor-kontak-paparan.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaktorKontakPaparanService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  store(pasienId: string, faktorKontakPaparan: FaktorKontakPaparan) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    console.log(faktorKontakPaparan);
    const reqBody = {
      'keluar_negeri': faktorKontakPaparan.keluarNegeri,
      'transmisi_lokal': faktorKontakPaparan.transmisiLokal,
      'kunjungan_faskes': faktorKontakPaparan.kunjunganFaskes,
      'pasar_hewan': faktorKontakPaparan.pasarHewan,
      'kontak_suspek': faktorKontakPaparan.kontakSuspek,
      'kontak_konfirmasi': faktorKontakPaparan.kontakKonfirmasi,
      'ispa_berat': faktorKontakPaparan.ispaBerat,
      'petugas_kesehatan': faktorKontakPaparan.petugasKesehatan,
      'apd': faktorKontakPaparan.apd,
      'gown': faktorKontakPaparan.gown,
      'masker': faktorKontakPaparan.masker,
      'sarung_tangan': faktorKontakPaparan.sarungTangan,
      'maskerniosn': faktorKontakPaparan.maskerniosn,
      'ffp3': faktorKontakPaparan.ffp3,
      'goggle': faktorKontakPaparan.goggle,
      'tidak_memakai_apd': faktorKontakPaparan.tidakMemakaiApd,
    };

    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/faktor-paparan-kontak',
      reqBody,
      httpOptions
    );

  }
}
