import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPremadeBouquetsComponent } from './all-premade-bouquets.component';

describe('AllPremadeBouquetsComponent', () => {
  let component: AllPremadeBouquetsComponent;
  let fixture: ComponentFixture<AllPremadeBouquetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPremadeBouquetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPremadeBouquetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
