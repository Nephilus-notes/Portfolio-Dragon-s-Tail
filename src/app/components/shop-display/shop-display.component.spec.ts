import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDisplayComponent } from './shop-display.component';

describe('ShopDisplayComponent', () => {
  let component: ShopDisplayComponent;
  let fixture: ComponentFixture<ShopDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
