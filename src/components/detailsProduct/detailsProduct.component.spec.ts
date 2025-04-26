import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductComponent } from './detailsProduct.component';

describe('DetailsComponent', () => {
  let component: DetailsProductComponent;
  let fixture: ComponentFixture<DetailsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
