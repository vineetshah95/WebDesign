import { TestBed } from '@angular/core/testing';

import { JobInfoService } from './job-info.service';

describe('JobInfoService', () => {
  let service: JobInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
