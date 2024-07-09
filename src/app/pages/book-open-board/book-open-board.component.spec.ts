import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOpenBoardComponent } from './book-open-board.component';

describe('BookOpenBoardComponent', () => {
  let component: BookOpenBoardComponent;
  let fixture: ComponentFixture<BookOpenBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookOpenBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOpenBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
