import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummraizedComponent } from './budget-summraized.component';

describe('BudgetSummraizedComponent', () => {
  let component: BudgetSummraizedComponent;
  let fixture: ComponentFixture<BudgetSummraizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetSummraizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSummraizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
