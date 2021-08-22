import { TestBed } from '@angular/core/testing';

import { FaktorKontakPaparanService } from './faktor-kontak-paparan.service';

describe('FaktorKontakPaparanService', () => {
  let service: FaktorKontakPaparanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaktorKontakPaparanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
