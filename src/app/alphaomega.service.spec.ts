import { TestBed } from '@angular/core/testing';

import { AlphaomegaService } from './alphaomega.service';

describe('AlphaomegaService', () => {
  let service: AlphaomegaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphaomegaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
