import { TestBed } from '@angular/core/testing';

import { BookNewBoardService } from './book-new-board.service';

describe('BookNewBoardService', () => {
  let service: BookNewBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookNewBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
