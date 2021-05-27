import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcSideNavbarComponent } from './proc-side-navbar.component';

describe('ProcSideNavbarComponent', () => {
  let component: ProcSideNavbarComponent;
  let fixture: ComponentFixture<ProcSideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcSideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
