import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTypeComponent } from './budget-type.component';

describe('BudgetTypeComponent', () => {
  let component: BudgetTypeComponent;
  let fixture: ComponentFixture<BudgetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
