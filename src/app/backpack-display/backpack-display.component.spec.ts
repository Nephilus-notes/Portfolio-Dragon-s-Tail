import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackDisplayComponent } from './backpack-display.component';

describe('BackpackDisplayComponent', () => {
  let component: BackpackDisplayComponent;
  let fixture: ComponentFixture<BackpackDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackpackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
