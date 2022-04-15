import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreditCardsComponent } from './my-credit-cards.component';

describe('MyCreditCardsComponent', () => {
  let component: MyCreditCardsComponent;
  let fixture: ComponentFixture<MyCreditCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCreditCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
