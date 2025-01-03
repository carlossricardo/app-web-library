import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookClientComponent } from './book-client.component';

describe('BookClientComponent', () => {
  let component: BookClientComponent;
  let fixture: ComponentFixture<BookClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookClientComponent]
    });
    fixture = TestBed.createComponent(BookClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
