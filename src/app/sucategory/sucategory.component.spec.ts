import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucategoryComponent } from './sucategory.component';

describe('SucategoryComponent', () => {
  let component: SucategoryComponent;
  let fixture: ComponentFixture<SucategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
