import { TestBed } from '@angular/core/testing';

import { CollabsService } from './collabs.service';

describe('CollabsService', () => {
  let service: CollabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
