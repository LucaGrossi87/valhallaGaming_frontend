import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLanComponent } from './book-lan.component';

describe('BookLanComponent', () => {
  let component: BookLanComponent;
  let fixture: ComponentFixture<BookLanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookLanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookLanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
