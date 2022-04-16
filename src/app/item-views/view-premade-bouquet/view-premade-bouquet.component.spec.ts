import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPremadeBouquetComponent } from './view-premade-bouquet.component';

describe('ViewPremadeBouquetComponent', () => {
  let component: ViewPremadeBouquetComponent;
  let fixture: ComponentFixture<ViewPremadeBouquetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPremadeBouquetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPremadeBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
