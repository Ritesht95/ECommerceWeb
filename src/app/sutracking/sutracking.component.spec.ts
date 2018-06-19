import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SutrackingComponent } from './sutracking.component';

describe('SutrackingComponent', () => {
  let component: SutrackingComponent;
  let fixture: ComponentFixture<SutrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SutrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SutrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
