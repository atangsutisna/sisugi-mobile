import { TestBed } from '@angular/core/testing';

import { InformasiPemeriksaanPenunjangService } from './informasi-pemeriksaan-penunjang.service';

describe('InformasiPemeriksaanPenunjangService', () => {
  let service: InformasiPemeriksaanPenunjangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformasiPemeriksaanPenunjangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
