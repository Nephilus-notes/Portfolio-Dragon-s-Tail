import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingBackgroundButtonComponent } from './moving-background-button.component';

describe('MovingBackgroundButtonComponent', () => {
  let component: MovingBackgroundButtonComponent;
  let fixture: ComponentFixture<MovingBackgroundButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingBackgroundButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovingBackgroundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
