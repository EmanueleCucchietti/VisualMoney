import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWalletComponent } from './dropdownWallet.component';

describe('DropdownWalletComponent', () => {
  let component: DropdownWalletComponent;
  let fixture: ComponentFixture<DropdownWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownWalletComponent]
    });
    fixture = TestBed.createComponent(DropdownWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
