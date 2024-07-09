import { TestBed } from '@angular/core/testing';

import { ManageStationsService } from './manage-stations.service';

describe('ManageStationsService', () => {
  let service: ManageStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
