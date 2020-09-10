import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeGenerateTokenComponent } from './stripe-generate-token.component';

describe('StripeGenerateTokenComponent', () => {
  let component: StripeGenerateTokenComponent;
  let fixture: ComponentFixture<StripeGenerateTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeGenerateTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeGenerateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
