import { TestBed } from '@angular/core/testing';

import { BookLanService } from './book-lan.service';

describe('BookLanService', () => {
  let service: BookLanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookLanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
