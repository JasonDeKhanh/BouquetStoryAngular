import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGiftCardTypeComponent } from './view-gift-card-type.component';

describe('ViewGiftCardTypeComponent', () => {
  let component: ViewGiftCardTypeComponent;
  let fixture: ComponentFixture<ViewGiftCardTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGiftCardTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGiftCardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
