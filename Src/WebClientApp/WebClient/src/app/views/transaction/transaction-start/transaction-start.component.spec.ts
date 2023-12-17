import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStartComponent } from './transaction-start.component';

describe('TransactionStartComponent', () => {
  let component: TransactionStartComponent;
  let fixture: ComponentFixture<TransactionStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionStartComponent]
    });
    fixture = TestBed.createComponent(TransactionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
