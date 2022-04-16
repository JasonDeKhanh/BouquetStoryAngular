import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBundleDetailsComponent } from './view-bundle-details.component';

describe('ViewBundleDetailsComponent', () => {
  let component: ViewBundleDetailsComponent;
  let fixture: ComponentFixture<ViewBundleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBundleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBundleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
