import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSliderComponent } from './income-slider.component';

describe('IncomeSliderComponent', () => {
  let component: IncomeSliderComponent;
  let fixture: ComponentFixture<IncomeSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeSliderComponent]
    });
    fixture = TestBed.createComponent(IncomeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
