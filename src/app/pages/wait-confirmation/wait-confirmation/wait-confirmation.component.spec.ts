import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitConfirmationComponent } from './wait-confirmation.component';

describe('WaitConfirmationComponent', () => {
  let component: WaitConfirmationComponent;
  let fixture: ComponentFixture<WaitConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
