import { TestBed } from '@angular/core/testing';

import { ConeccionapiService } from './coneccionapi.service';

describe('ConeccionapiService', () => {
  let service: ConeccionapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConeccionapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
