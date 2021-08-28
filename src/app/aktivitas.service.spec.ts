import { TestBed } from '@angular/core/testing';

import { AktivitasService } from './aktivitas.service';

describe('AktivitasService', () => {
  let service: AktivitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AktivitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
