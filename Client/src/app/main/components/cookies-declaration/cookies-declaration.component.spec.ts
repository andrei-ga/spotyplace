import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesDeclarationComponent } from './cookies-declaration.component';

describe('CookiesDeclarationComponent', () => {
  let component: CookiesDeclarationComponent;
  let fixture: ComponentFixture<CookiesDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
