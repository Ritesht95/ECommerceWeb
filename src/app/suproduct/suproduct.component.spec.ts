import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuproductComponent } from './suproduct.component';

describe('SuproductComponent', () => {
  let component: SuproductComponent;
  let fixture: ComponentFixture<SuproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
