import { TestBed } from '@angular/core/testing';

import { PlacardService } from './placard.service';

describe('PlacardService', () => {
  let service: PlacardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
