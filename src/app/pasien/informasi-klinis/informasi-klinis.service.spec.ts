import { TestBed } from '@angular/core/testing';

import { InformasiKlinisService } from './informasi-klinis.service';

describe('InformasiKlinisService', () => {
  let service: InformasiKlinisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformasiKlinisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
