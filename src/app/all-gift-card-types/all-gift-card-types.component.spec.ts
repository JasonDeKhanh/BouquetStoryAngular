import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGiftCardTypesComponent } from './all-gift-card-types.component';

describe('AllGiftCardTypesComponent', () => {
  let component: AllGiftCardTypesComponent;
  let fixture: ComponentFixture<AllGiftCardTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGiftCardTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGiftCardTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
