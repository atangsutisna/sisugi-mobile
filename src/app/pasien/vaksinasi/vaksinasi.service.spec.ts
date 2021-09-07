import { TestBed } from '@angular/core/testing';

import { VaksinasiService } from './vaksinasi.service';

describe('VaksinasiService', () => {
  let service: VaksinasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaksinasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
