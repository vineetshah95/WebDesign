import { TestBed } from '@angular/core/testing';

import { ShareIDService } from './share-id.service';

describe('ShareIDService', () => {
  let service: ShareIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
