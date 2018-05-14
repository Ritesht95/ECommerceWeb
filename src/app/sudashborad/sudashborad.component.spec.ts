import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudashboradComponent } from './sudashborad.component';

describe('SudashboradComponent', () => {
  let component: SudashboradComponent;
  let fixture: ComponentFixture<SudashboradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudashboradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
