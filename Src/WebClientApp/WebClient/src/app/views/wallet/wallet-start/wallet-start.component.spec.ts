import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletStartComponent } from './wallet-start.component';

describe('WalletStartComponent', () => {
  let component: WalletStartComponent;
  let fixture: ComponentFixture<WalletStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletStartComponent]
    });
    fixture = TestBed.createComponent(WalletStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
