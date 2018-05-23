import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntialSetupComponent } from './intial-setup.component';

describe('IntialSetupComponent', () => {
  let component: IntialSetupComponent;
  let fixture: ComponentFixture<IntialSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntialSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntialSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
