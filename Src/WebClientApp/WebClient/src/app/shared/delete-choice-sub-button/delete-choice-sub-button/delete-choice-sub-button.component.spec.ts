import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChoiceSubButtonComponent } from './delete-choice-sub-button.component';

describe('DeleteChoiceSubButtonComponent', () => {
  let component: DeleteChoiceSubButtonComponent;
  let fixture: ComponentFixture<DeleteChoiceSubButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteChoiceSubButtonComponent]
    });
    fixture = TestBed.createComponent(DeleteChoiceSubButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
