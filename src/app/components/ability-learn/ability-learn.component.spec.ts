import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityLearnComponent } from './ability-learn.component';

describe('AbilityLearnComponent', () => {
  let component: AbilityLearnComponent;
  let fixture: ComponentFixture<AbilityLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityLearnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilityLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
