import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanClientComponent } from './loan-client.component';

describe('LoanClientComponent', () => {
  let component: LoanClientComponent;
  let fixture: ComponentFixture<LoanClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanClientComponent]
    });
    fixture = TestBed.createComponent(LoanClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
