import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatDisplayComponent } from './combat-display.component';

describe('CombatDisplayComponent', () => {
  let component: CombatDisplayComponent;
  let fixture: ComponentFixture<CombatDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
