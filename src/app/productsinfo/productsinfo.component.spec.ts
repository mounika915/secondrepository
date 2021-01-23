import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsinfoComponent } from './productsinfo.component';

describe('ProductsinfoComponent', () => {
  let component: ProductsinfoComponent;
  let fixture: ComponentFixture<ProductsinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
