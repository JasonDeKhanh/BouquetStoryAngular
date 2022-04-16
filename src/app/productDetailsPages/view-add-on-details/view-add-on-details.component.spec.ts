import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddOnDetailsComponent } from './view-add-on-details.component';

describe('ViewAddOnDetailsComponent', () => {
  let component: ViewAddOnDetailsComponent;
  let fixture: ComponentFixture<ViewAddOnDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddOnDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddOnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
