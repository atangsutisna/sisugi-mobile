import { InformasiPemeriksaanPenunjang } from './informasi-pemeriksaan-penunjang.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InformasiPemeriksaanPenunjangService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  store(pasienId: string, informasiPemeriksaanPenunjang: InformasiPemeriksaanPenunjang) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    let tanggalPemeriksaanRdtAntigen = null;
    let tanggalPemeriksaanRdtAntigen2 = null;
    if (informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen != null) {
      tanggalPemeriksaanRdtAntigen = moment( informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen).format('YYYY-MM-DD');
    }
    if (informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen2 != null) {
      tanggalPemeriksaanRdtAntigen2 = moment(informasiPemeriksaanPenunjang.tanggalPemeriksaanRdtAntigen2).format('YYYY-MM-DD');
    }

    let tanggalPengambilan1 = null;
    let tanggalPengambilanKeluar1 = null;
    if (informasiPemeriksaanPenunjang.tanggalPengambilan1 != null) {
      tanggalPengambilan1 = moment(informasiPemeriksaanPenunjang.tanggalPengambilan1).format('YYYY-MM-DD');
      tanggalPengambilanKeluar1 = moment(informasiPemeriksaanPenunjang.tanggalPengambilanKeluar1).format('YYYY-MM-DD');
    }

    let tanggalPengambilan2 = null;
    let tanggalPengambilanKeluar2 = null;
    if (informasiPemeriksaanPenunjang.tanggalPengambilan2 != null) {
      tanggalPengambilan2 = moment(informasiPemeriksaanPenunjang.tanggalPengambilan2).format('YYYY-MM-DD');
      tanggalPengambilanKeluar2 = moment(informasiPemeriksaanPenunjang.tanggalPengambilanKeluar2).format('YYYY-MM-DD');
    }

    const reqBody = {
      'pemeriksaan_rdt_antigen': informasiPemeriksaanPenunjang.pemeriksaanRdtAntigen,
      'tanggal_pemeriksaan_rdt_antigen': tanggalPemeriksaanRdtAntigen,
      'hasil_pemeriksaan_rdt_antigen': informasiPemeriksaanPenunjang.hasilPemeriksaanRdtAntigen,
      'tanggal_pemeriksaan_rdt_antigen2': tanggalPemeriksaanRdtAntigen2,
      'hasil_pemeriksaan_rdt_antigen2': informasiPemeriksaanPenunjang.hasilPemeriksaanRdtAntigen2,
      'spesimen': informasiPemeriksaanPenunjang.spesimen,
      'jenis_spesimen_1': informasiPemeriksaanPenunjang.jenisSpesimen1,
      'swab_nasofaring_1': informasiPemeriksaanPenunjang.swabNasofaring1,
      'swab_orofaring_1': informasiPemeriksaanPenunjang.swabOrofaring1,
      'sputum_1': informasiPemeriksaanPenunjang.sputum1,
      'serum_1': informasiPemeriksaanPenunjang.serum1,
      'tanggal_pengambilan_1': tanggalPengambilan1,
      'tanggal_pengambilan_keluar_1': tanggalPengambilanKeluar1,
      'hasil_pemeriksaan_spesimen_1': informasiPemeriksaanPenunjang.hasilPemeriksaanSpesimen1,
      'jenis_spesimen_2': informasiPemeriksaanPenunjang.jenisSpesimen2,
      'swab_nasofaring_2': informasiPemeriksaanPenunjang.swabNasofaring2,
      'swab_orofaring_2': informasiPemeriksaanPenunjang.swabOrofaring2,
      'sputum_2': informasiPemeriksaanPenunjang.sputum2,
      'serum_2': informasiPemeriksaanPenunjang.serum2,
      'tanggal_pengambilan_2': tanggalPengambilan2,
      'tanggal_pengambilan_keluar_2': tanggalPengambilanKeluar2,
      'hasil_pemeriksaan_spesimen_2': informasiPemeriksaanPenunjang.tanggalPengambilanKeluar2
    };

    return this.httpClient.put(
      environment.apiUri + '/pasien/' + pasienId + '/informasi-pemeriksaan-penunjang',
      reqBody,
      httpOptions
    );

  }
}
