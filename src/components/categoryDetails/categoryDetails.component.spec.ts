import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCategoryComponent } from './pro-category.component';

describe('ProCategoryComponent', () => {
  let component: ProCategoryComponent;
  let fixture: ComponentFixture<ProCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
