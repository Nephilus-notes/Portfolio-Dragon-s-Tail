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
    const expectedCombatant = {
      name: "Krakt Rat",
      bag: [],
      equippedItems: {
        'head':null,
        'body':{id:3,
      'name': 'Leather Armor',
      'itemStat': 1, 'price': 20, "slot": "body",
      'description': 
    `Toughened leather 
    Protects against
    both elements and enemies.`},
        hand: null
    },
      armor: 4,
      resistance: 2,
      strength: 13,
      dexterity: 15,
      intelligence: 13,
      constitution: 16,
      hp: 32,
      max_mp: 26,
      damage: 5,
      abilities: [],
      current_hp: 31,
      current_mp: 26,
    };
    component.combatant = expectedCombatant
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
