import { TestBed } from '@angular/core/testing';

import { StatusEpiService } from './status-epi.service';

describe('StatusEpiService', () => {
  let service: StatusEpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusEpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
