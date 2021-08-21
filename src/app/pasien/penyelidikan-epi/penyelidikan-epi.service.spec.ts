import { TestBed } from '@angular/core/testing';

import { PenyelidikanEpiService } from './penyelidikan-epi.service';

describe('PenyelidikanEpiService', () => {
  let service: PenyelidikanEpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenyelidikanEpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
