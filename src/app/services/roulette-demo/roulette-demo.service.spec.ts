import { TestBed } from '@angular/core/testing';

import { RouletteDemoService } from './roulette-demo.service';

describe('RouletteDemoService', () => {
  let service: RouletteDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouletteDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
