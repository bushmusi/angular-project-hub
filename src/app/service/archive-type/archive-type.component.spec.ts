import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTypeComponent } from './archive-type.component';

describe('ArchiveTypeComponent', () => {
  let component: ArchiveTypeComponent;
  let fixture: ComponentFixture<ArchiveTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
