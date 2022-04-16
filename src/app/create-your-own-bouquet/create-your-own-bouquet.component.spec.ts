import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateYourOwnBouquetComponent } from './create-your-own-bouquet.component';

describe('CreateYourOwnBouquetComponent', () => {
  let component: CreateYourOwnBouquetComponent;
  let fixture: ComponentFixture<CreateYourOwnBouquetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateYourOwnBouquetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateYourOwnBouquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
