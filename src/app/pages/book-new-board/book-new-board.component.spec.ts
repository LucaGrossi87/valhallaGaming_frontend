import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookNewBoardComponent } from './book-new-board.component';

describe('BookNewBoardComponent', () => {
  let component: BookNewBoardComponent;
  let fixture: ComponentFixture<BookNewBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookNewBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookNewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
