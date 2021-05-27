import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSideNavbarComponent } from './org-side-navbar.component';

describe('OrgSideNavbarComponent', () => {
  let component: OrgSideNavbarComponent;
  let fixture: ComponentFixture<OrgSideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
