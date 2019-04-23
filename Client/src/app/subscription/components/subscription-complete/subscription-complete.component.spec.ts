import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCompleteComponent } from './subscription-complete.component';

describe('SubscriptionCompleteComponent', () => {
  let component: SubscriptionCompleteComponent;
  let fixture: ComponentFixture<SubscriptionCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
