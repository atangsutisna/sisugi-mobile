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

    const apiUri = new URL(environment.apiUri + '/pasien/' + pasienId + "/kontak-erat");
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

  fetchPe(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginService.getUser().value.token,
        Accept: 'application/json',
      }),
    };

    return this.httpClient
      .get(environment.apiUri + '/pasien/' + id + "/penyelidikan-epi", httpOptions)
      .pipe(
        map((response: any) => {
          const penyelidikanPe = response.data;
          return {
            id: penyelidikanPe.id,
            tanggalWawancara: penyelidikanPe.tanggal_wawancara,
            terdapatGejala: penyelidikanPe.terdapat_gejala,
            tanggalGejala: new Date(penyelidikanPe.tanggal_gejala),
            kurvaEpidemiologi: new Date(penyelidikanPe.kurva_epidemiologi),
            demam: penyelidikanPe.demam,
            batuk: penyelidikanPe.batuk,
            pilek: penyelidikanPe.pilek,
            sakitTenggorokan: penyelidikanPe.sakit_tenggorokan,
            sesakNapas: penyelidikanPe.sesak_napas,
            sakitKepala: penyelidikanPe.sakit_kepala,
            lemas: penyelidikanPe.lemas,
            nyeriOtot: penyelidikanPe.nyeri_otot,
            mualMuntah: penyelidikanPe.mual_muntah,
            nyeriAbdomen: penyelidikanPe.nyeri_abdomen,
            diare: penyelidikanPe.diare,
            gangguanMenghidu: penyelidikanPe.gangguan_menghidu,
            gangguanMengecap: penyelidikanPe.gangguan_mengecap,
            gejalaLainnya: penyelidikanPe.gejala_lainnya,
            ketGejalaLainnya: penyelidikanPe.ket_gejala_lainnya,
            hamil: penyelidikanPe.hamil,
            diabetes: penyelidikanPe.diabetes,
            penyakitJantung: penyelidikanPe.penyakit_jantung,
            hipertensi: penyelidikanPe.hipertensi,
            keganasan: penyelidikanPe.keganasan,
            gangguanImmunologi: penyelidikanPe.gangguan_imunologi,
            gagalGinjal: penyelidikanPe.gagal_ginjal,
            gagalHati: penyelidikanPe.gagal_hati,
            ppok: penyelidikanPe.ppok,
            komorbidLainnya: penyelidikanPe.komorbid_lainnya,
            ketKomorbidLainnya: penyelidikanPe.ket_komorbid_lainnya,
            dirawatdirs: penyelidikanPe.dirawatdirs,
            namars: penyelidikanPe.namars,
            tanggalMasukRs: penyelidikanPe.tanggal_masuk_rs,
            icu: penyelidikanPe.icu,
            intubasi: penyelidikanPe.intubasi,
            emco: penyelidikanPe.emco,
            statusTerakhir: penyelidikanPe.status_terakhir,
            tanggalMeninggal: new Date(penyelidikanPe.tanggal_meninggal),
            pneumonia: penyelidikanPe.pneumonia,
            ards: penyelidikanPe.ards,
            lainnya: penyelidikanPe.lainnya,
            ketLainnya: penyelidikanPe.ket_lainnya,
            spesimen: penyelidikanPe.spesimen,
            jenisSpesimen1: penyelidikanPe.jenis_spesimen_1,
            swabNasofaring1: penyelidikanPe.swab_nasofaring_1,
            swabOrofaring1: penyelidikanPe.swab_orofaring_1,
            sputum1: penyelidikanPe.sputum_1,
            serum1: penyelidikanPe.serum_1,
            tanggalPengambilan1: new Date(penyelidikanPe.tanggal_pengambilan_1),
            tanggalPengambilanKeluar1: new Date(penyelidikanPe.tanggal_pengambilan_keluar_1),
            hasilPemeriksaanSpesimen1: penyelidikanPe.hasil_pemeriksaan_spesimen_1,
            jenisSpesimen2: penyelidikanPe.jenis_spesimen_2,
            swabNasofaring2: penyelidikanPe.swab_nasofaring_2,
            swabOrofaring2: penyelidikanPe.swab_orofaring_2,
            sputum2: penyelidikanPe.sputum_2,
            serum2: penyelidikanPe.serum_2,
            tanggalPengambilan2: new Date(penyelidikanPe.tanggal_pengambilan_2),
            tanggalPengambilanKeluar2: new Date(penyelidikanPe.tanggal_pengambilan_keluar_2),
            hasilPemeriksaanSpesimen2: penyelidikanPe.hasil_pemeriksaan_spesimen_2,
            pemeriksaaRdtAntigen: penyelidikanPe.pemeriksaan_rdt_antigen,
            tanggalPemeriksaanRdtAntigen: penyelidikanPe.tanggal_pemeriksaan_rdt_antigen,
            hasilPemeriksaanRdtAntigen: penyelidikanPe.hasil_pemeriksaan_rdt_antigen,
            tanggalPemeriksaanRdtAntigen2: penyelidikanPe.tanggal_pemeriksaan_rdt_antigen2,
            hasilPemeriksaanRdtAntigen2: penyelidikanPe.hasil_pemeriksaan_rdt_antigen2,
            keluarNegeri: penyelidikanPe.keluar_negeri,
            transmisiLokal: penyelidikanPe.transmisi_lokal,
            kunjunganFaskes: penyelidikanPe.kunjungan_faskes,
            pasarHewan: penyelidikanPe.pasar_hewan,
            kontakSuspek: penyelidikanPe.kontak_suspek,
            kontakKonfirmasi: penyelidikanPe.kontak_konfirmasi,
            ispaBerat: penyelidikanPe.ispa_berat,
            petugasKesehatan: penyelidikanPe.petugas_kesehatan,
            apd: penyelidikanPe.apd,
            gown: penyelidikanPe.gown,
            masker: penyelidikanPe.masker,
            sarungTangan: penyelidikanPe.sarung_tangan,
            maskerniosn: penyelidikanPe.maskerniosn,
            ffp3: penyelidikanPe.ffp3,
            goggle: penyelidikanPe.goggle,
            tidakMemakaiApd: penyelidikanPe.tidak_memakai_apd,
            aerosol: penyelidikanPe.aerosol,
            kontakErat: penyelidikanPe.kontak_erat,
            statusEpidemiologi: penyelidikanPe.status_epidemiologi,
            tanggalLaporanKonfirmasi: new Date(penyelidikanPe.tanggal_laporan_konfirmasi),
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
      .get(environment.apiUri + '/pasien/' + id + "/isoman", httpOptions)
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
      .get(environment.apiUri + '/pasien/' + id + "/catatan", httpOptions)
      .pipe(map((resp: any) => {
        return {
          idkasus: resp.data.idkasus,
          statusEpidemiologi: resp.data.status_epidemiologi,
        };
      }));
  }
}
