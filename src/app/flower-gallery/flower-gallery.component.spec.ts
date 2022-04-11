import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerGalleryComponent } from './flower-gallery.component';

describe('FlowerGalleryComponent', () => {
  let component: FlowerGalleryComponent;
  let fixture: ComponentFixture<FlowerGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
