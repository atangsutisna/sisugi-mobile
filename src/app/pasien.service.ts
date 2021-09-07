import { InformasiPemeriksaanPenunjang } from './pasien/informasi-pemeriksaan-penunjang/informasi-pemeriksaan-penunjang.model';
import { PemantauanKesehatan } from './pemantauan-kes.model';
import { PostPasien } from './post-pasien.model';
import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Pasien } from './pasien.model';
import { KontakErat } from './kontak-erat.model';
import { PenyelidikanEpi } from './penyelidikan-epi.model';
import { Observable } from 'rxjs';
import { Isoman } from './isoman.model';
import { CatatanPasien } from './catatan-pasien.model';
import { InformasiKlinis } from './pasien/informasi-klinis/informasi-klinis.model';
import { VaksinasiPasien } from './vaksinasi-vasian.model';

@Injectable({
  providedIn: 'root',
})
export class PasienService {
  private size = 15;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  fetchAll(page: number, term?: string) {
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
    if (term !== undefined && term !== '') {
      apiUri.searchParams.append('term', term);
    }
    console.log('apiUri ' + apiUri.href);
    return this.httpClient.get(apiUri.href, httpOptions).pipe(
      map((response: any) => {
        const patients: Array<Pasien> = [];
        for (const patient of response.data) {
          patients.push({
            id: patient.id,
            idKasus: patient.idkasus,
            puskesmasId: patient.puskesmas_id,
            puskesmasNama: patient.puskesmas_nama,
            nik: patient.nik,
            nama: patient.nama,
            vaksinasi: patient.vaksinasi,
            tglDosis1: patient.tgl_dosis_1,
            tglDosis2: patient.tgl_dosis_2,
            tanggalLahir: new Date(patient.tgl_lahir),
            jenisKelamin: patient.jenis_kelamin,
            kewarganegaraan: patient.kewarganegaraan,
            pekerjaan: patient.pekerjaan,
            ketPekerjaanLainnya: patient.keterangan_pekerjaan_lainnya,
            nohp: patient.nohp,
            jalan: patient.jalan,
            rt: patient.rt,
            rw: patient.rw,
            kelurahanId: patient.kelurahan_id,
            kelurahanNama: patient.kelurahan_nama,
            kecamatanId: patient.kecamatan_id,
            kecamatanNama: patient.kecamatan_nama,
            kabkotaId: patient.kabkota_id,
            kabkotaNama: patient.kabkota_nama,
            provinsiId: patient.provinsi_id,
            provinsiNama: patient.provinsi_nama,
            latitude: patient.latitude,
            longitude: patient.longitude,
            statusEpidemiologi: null,
            statusAkhir: patient.status_terakhir,
            createdAt: new Date(patient.created_at),
            updatedAt: new Date(patient.updated_at),
          });
        }

        return patients;
      })
    );
  }

  fetch(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id, httpOptions)
      .pipe(
        map((response: any) => {
          const patient = response.data;
          return {
            id: patient.id,
            idKasus: patient.idkasus,
            puskesmasId: patient.puskesmas_id,
            puskesmasNama: patient.puskesmas_nama,
            nik: patient.nik,
            nama: patient.nama,
            vaksinasi: patient.vaksinasi,
            tglDosis1: patient.tgl_dosis_1,
            tglDosis2: patient.tgl_dosis_2,
            tanggalLahir: new Date(patient.tgl_lahir),
            jenisKelamin: patient.jenis_kelamin,
            kewarganegaraan: patient.kewarganegaraan,
            pekerjaan: patient.pekerjaan,
            ketPekerjaanLainnya: patient.keterangan_pekerjaan_lainnya,
            nohp: patient.nohp,
            jalan: patient.jalan,
            rt: patient.rt,
            rw: patient.rw,
            kelurahanId: patient.kelurahan_id,
            kelurahanNama: patient.kelurahan_nama,
            kecamatanId: patient.kecamatan_id,
            kecamatanNama: patient.kecamatan_nama,
            kabkotaId: patient.kabkota_id,
            kabkotaNama: patient.kabkota_nama,
            provinsiId: patient.provinsi_id,
            provinsiNama: patient.provinsi_nama,
            latitude: patient.latitude,
            longitude: patient.longitude,
            statusEpidemiologi: null,
            statusAkhir: patient.status_terakhir,
            createdAt: new Date(patient.created_at),
            updatedAt: new Date(patient.updated_at),
          };
        })
      );
  }

  store(postPasien: PostPasien) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const reqBody = {
      nik: postPasien.nik,
      nama: postPasien.nama,
      jeniskelamin: postPasien.jenisKelamin,
      warga: postPasien.warga,
      tanggallahir: postPasien.tanggalLahir,
      jalan: postPasien.jalan,
      rt: postPasien.rt,
      rw: postPasien.rw,
      kabkota_id: postPasien.kabkotaId,
      kecamatan_id: postPasien.kecamatanId,
      kelurahan_id: postPasien.kelurahanId,
      pekerjaan: postPasien.pekerjaan,
      provinsi_id: postPasien.provinsiId,
      nohp: postPasien.nohp,
    };

    return this.httpClient.post(
      environment.apiUri + '/pasien',
      reqBody,
      httpOptions
    );
  }

  update(id: string, postPasien: PostPasien) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    const reqBody = {
      nik: postPasien.nik,
      nama: postPasien.nama,
      jeniskelamin: postPasien.jenisKelamin,
      warga: postPasien.warga,
      tanggallahir: postPasien.tanggalLahir,
      jalan: postPasien.jalan,
      rt: postPasien.rt,
      rw: postPasien.rw,
      kabkota_id: postPasien.kabkotaId,
      kecamatan_id: postPasien.kecamatanId,
      kelurahan_id: postPasien.kelurahanId,
      pekerjaan: postPasien.pekerjaan,
      provinsi_id: postPasien.provinsiId,
      nohp: postPasien.nohp,
    };

    return this.httpClient.put(
      environment.apiUri + '/pasien/' + id,
      reqBody,
      httpOptions
    );
  }

  delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient.delete(
      environment.apiUri + '/pasien/' + id,
      httpOptions
    );
  }

  fetchKe(pasienId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Authorization': 'Bearer '+ this.loginService.getUser().value.token,
          'Accept':'application/json'
        })
    };

    const apiUri = new URL(environment.apiUri + '/pasien/' + pasienId + '/kontak-erat');
    return this.httpClient.get(apiUri.href, httpOptions).pipe(map((response: any) => {
      const contacts: Array<KontakErat> = [];
      for (const ke of response.data) {
        contacts.push({
          id: ke.id,
          idKasus: ke.idkasus,
          idKontak: ke.idkontak,
          tanggalKontak: ke.tanggal_kontak,
          nama: ke.nama,
          nik: ke.nik,
          belumAdaNik: ke.belum_ada_nik,
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

  fetchPe(id: string): Observable<PenyelidikanEpi> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/penyelidikan-epi', httpOptions)
      .pipe(
        map((response: any) => {
          const penyelidikanPe = response.data;
          return {
            id: penyelidikanPe.id,
            tanggalWawancara: penyelidikanPe.tanggal_wawancara,
            statusEpidemiologi: penyelidikanPe.status_epidemiologi,
            status: penyelidikanPe.status,
            createdAt: new Date(penyelidikanPe.created_at),
            updatedAt: new Date(penyelidikanPe.updated_at)
          };
        })
      );
  }

  fetchIsoman(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/isoman', httpOptions)
      .pipe(
        map((resp: any) => {
          const isomans: Array<Isoman> = [];
          for (const isoman of resp.data) {
            isomans.push({
              id: isoman.id,
              idKasus: isoman.idkasus,
              nik: isoman.nik,
              nama: isoman.nama,
              kesehatan: isoman.kesehatan,
              tanggalPemantauan: isoman.tanggal_pemantauan,
              pemantauanTerakhir: isoman.pemantauan_terakhir,
              status: isoman.status,
              createdAt: new Date(isoman.created_at),
              updatedAt: new Date(isoman.updated_at)
            });
          }

          return isomans;
        })
      );
  }

  fetchCatatan(id: string): Observable<CatatanPasien> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/status-epi', httpOptions)
      .pipe(map((resp: any) => {
        return {
          idkasus: resp.data.idkasus,
          statusEpidemiologi: resp.data.status_epidemiologi,
        };
      }));
  }

  fetchInformasiKlinis(id: string): Observable<InformasiKlinis> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/informasi-klinis', httpOptions)
      .pipe(
        map((response: any) => {
          const informasiKlinis = response.data;
          return {
            terdapatGejala: informasiKlinis.terdapat_gejala,
            tanggalGejala: informasiKlinis.tanggal_gejala,
            demam: informasiKlinis.demam,
            batuk: informasiKlinis.batuk,
            pilek: informasiKlinis.pilek,
            sakitTenggorokan: informasiKlinis.sakit_tenggorokan,
            sesakNapas: informasiKlinis.sesak_napas,
            sakitKepala: informasiKlinis.sakit_kepala,
            lemas: informasiKlinis.lemas,
            nyeriOtot: informasiKlinis.nyeri_otot,
            mualMuntah: informasiKlinis.mual_muntah,
            nyeriAbdomen: informasiKlinis.nyeri_abdomen,
            diare: informasiKlinis.diare,
            gangguanMenghidu: informasiKlinis.gangguan_menghidu,
            gangguanMengecap: informasiKlinis.gangguan_mengecap,
            gejalaLainnya: informasiKlinis.gejala_lainnya,
            ketGejalaLainnya: informasiKlinis.ket_gejala_lainnya,
            hamil: informasiKlinis.hamil,
            diabetes: informasiKlinis.diabetes,
            penyakitJantung: informasiKlinis.penyakit_jantung,
            hipertensi: informasiKlinis.hipertensi,
            keganasan: informasiKlinis.keganasan,
            gangguanImmunologi: informasiKlinis.gangguan_imunologi,
            gagalGinjal: informasiKlinis.gagal_ginjal,
            gagalHati: informasiKlinis.gagal_hati,
            ppok: informasiKlinis.ppok,
            komorbidLainnya: informasiKlinis.komorbid_lainnya,
            ketKomorbidLainnya: informasiKlinis.ket_komorbid_lainnya,
            dirawatdirs: informasiKlinis.dirawatdirs,
            namars: informasiKlinis.namars,
            tanggalMasukRs: informasiKlinis.tanggal_masuk_rs,
            icu: informasiKlinis.icu,
            intubasi: informasiKlinis.intubasi,
            emco: informasiKlinis.emco,
            statusTerakhir: informasiKlinis.status_terakhir,
            pneumonia: informasiKlinis.pneumonia,
            ards: informasiKlinis.ards,
            lainnya: informasiKlinis.lainnya,
            ketLainnya: informasiKlinis.ket_lainnya,
          };
        })
      );
  }

  fetchInformasiPemeriksaanPenunjang(id: string): Observable<InformasiPemeriksaanPenunjang> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/informasi-pemeriksaan-penunjang', httpOptions)
      .pipe(
        map((response: any) => {
          const informasiPemeriksaanPenunjang = response.data;
          return {
            pemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.pemeriksaan_rdt_antigen,
            tanggalPemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.tanggal_pemeriksaan_rdt_antigen,
            hasilPemeriksaanRdtAntigen: informasiPemeriksaanPenunjang.hasil_pemeriksaan_rdt_antigen,
            tanggalPemeriksaanRdtAntigen2: informasiPemeriksaanPenunjang.tanggal_pemeriksaan_rdt_antigen2,
            hasilPemeriksaanRdtAntigen2: informasiPemeriksaanPenunjang.hasil_pemeriksaan_rdt_antigen2,
            spesimen: informasiPemeriksaanPenunjang.spesimen,
            jenisSpesimen1: informasiPemeriksaanPenunjang.jenis_spesimen_1,
            swabNasofaring1: informasiPemeriksaanPenunjang.swab_nasofaring_1,
            swabOrofaring1: informasiPemeriksaanPenunjang.swab_orofaring_1,
            sputum1: informasiPemeriksaanPenunjang.sputum_1,
            serum1: informasiPemeriksaanPenunjang.serum_1,
            tanggalPengambilan1: informasiPemeriksaanPenunjang.tanggal_pengambilan_1,
            tanggalPengambilanKeluar1: informasiPemeriksaanPenunjang.tanggal_pengambilan_keluar_1,
            hasilPemeriksaanSpesimen1: informasiPemeriksaanPenunjang.hasil_pemeriksaan_spesimen_1,
            jenisSpesimen2: informasiPemeriksaanPenunjang.jenis_spesimen_2,
            swabNasofaring2: informasiPemeriksaanPenunjang.swab_nasofaring_2,
            swabOrofaring2: informasiPemeriksaanPenunjang.swab_orofaring_2,
            sputum2: informasiPemeriksaanPenunjang.sputum_2,
            serum2: informasiPemeriksaanPenunjang.serum_2,
            tanggalPengambilan2: informasiPemeriksaanPenunjang.tanggal_pengambilan_2,
            tanggalPengambilanKeluar2: informasiPemeriksaanPenunjang.tanggal_pengambilan_keluar_2,
            hasilPemeriksaanSpesimen2: informasiPemeriksaanPenunjang.hasil_pemeriksaan_spesimen_2
          };
        })
      );

  }

  fetchFaktorKontakPaparan(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/faktor-paparan-kontak', httpOptions)
      .pipe(
        map((response: any) => {
          const faktorPaparanKontak = response.data;
          console.log(faktorPaparanKontak);
          return {
            keluarNegeri: faktorPaparanKontak.keluar_negeri,
            transmisiLokal: faktorPaparanKontak.transmisi_lokal,
            kunjunganFaskes: faktorPaparanKontak.kunjungan_faskes,
            pasarHewan: faktorPaparanKontak.pasar_hewan,
            kontakSuspek: faktorPaparanKontak.kontak_suspek,
            kontakKonfirmasi: faktorPaparanKontak.kontak_konfirmasi,
            ispaBerat: faktorPaparanKontak.ispa_berat,
            petugasKesehatan: faktorPaparanKontak.petugas_kesehatan,
            apd: faktorPaparanKontak.apd,
            gown: faktorPaparanKontak.gown,
            masker: faktorPaparanKontak.masker,
            sarungTangan: faktorPaparanKontak.sarung_tangan,
            maskerniosn: faktorPaparanKontak.maskerniosn,
            ffp3: faktorPaparanKontak.ffp3,
            goggle: faktorPaparanKontak.goggle,
            tidakMemakaiApd: faktorPaparanKontak.tidak_memakai_apd,
            aerosol: faktorPaparanKontak.aerosol
          };
        })
      );
  }

  fetchVaksinasi(id: string): Observable<VaksinasiPasien> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + '/vaksinasi', httpOptions)
      .pipe(map((resp: any) => {
        let vaksinasi = null;
        if (resp.data.vaksinasi !== null && resp.data.vaksinasi == 1) {
          vaksinasi = '1';
        }

        if (resp.data.vaksinasi !== null && resp.data.vaksinasi == 0) {
          vaksinasi = '0';
        }

        return {
          vaksinasi: vaksinasi,
          tglDosis1: resp.data.tgl_dosis_1,
          tglDosis2: resp.data.tgl_dosis_2,
        };
      }));
  }

}
