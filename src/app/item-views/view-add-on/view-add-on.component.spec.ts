import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddOnComponent } from './view-add-on.component';

describe('ViewAddOnComponent', () => {
  let component: ViewAddOnComponent;
  let fixture: ComponentFixture<ViewAddOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAddOnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAddOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
