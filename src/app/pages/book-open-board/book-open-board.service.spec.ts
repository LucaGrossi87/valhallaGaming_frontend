import { TestBed } from '@angular/core/testing';

import { BookOpenBoardService } from './book-open-board.service';

describe('BookOpenBoardService', () => {
  let service: BookOpenBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookOpenBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
