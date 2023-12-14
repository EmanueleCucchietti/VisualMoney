import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletViewComponent } from './wallet-view.component';

describe('WalletEditComponent', () => {
  let component: WalletViewComponent;
  let fixture: ComponentFixture<WalletViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletViewComponent]
    });
    fixture = TestBed.createComponent(WalletViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
