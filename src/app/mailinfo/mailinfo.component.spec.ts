import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailinfoComponent } from './mailinfo.component';

describe('MailinfoComponent', () => {
  let component: MailinfoComponent;
  let fixture: ComponentFixture<MailinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
