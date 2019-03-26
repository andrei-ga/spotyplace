import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFloorComponent } from './view-floor.component';

describe('ViewFloorComponent', () => {
  let component: ViewFloorComponent;
  let fixture: ComponentFixture<ViewFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
