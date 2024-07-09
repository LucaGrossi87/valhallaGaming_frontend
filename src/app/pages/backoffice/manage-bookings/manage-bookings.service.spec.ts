import { TestBed } from '@angular/core/testing';

import { ManageBookingsService } from './manage-bookings.service';

describe('ManageBookingsService', () => {
  let service: ManageBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
