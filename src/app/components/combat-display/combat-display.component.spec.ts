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
            items: [
              {id: 1,
            'name': "Death's Scythe",
            'itemStat': 15, 'price': 500, "slot": "hand",
            'description': 
          `Magical scythe 
          Whenever you touch this 
          weapon you can hear faint 
          whispers all around you.`}, 
              {id:2,
              'name': 'Minor Health Potion', 
              'itemStat': 2, 'price': 10, 'slot': 'consumable', 
              'description':
          `Red potion 
          Smells of cinnamon and 
          nutmeg. Heals a little.`},
          {id: 3, 'name': 'Chainmail Armor',
              'itemStat': 3, 'price': 60, "slot": "body",
              'description': 
      `Toughened leather Protects against
      both elements and enemies.`}
          ],
            equippedItems: {
              head:null,
              body:{id:3,
            'name': 'Leather Armor',
            'itemStat': 1, 'price': 20, "slot": "body",
            'description': 
          `Toughened leather 
          Protects against
          both elements and enemies.`},
              hand: null
          },
          currentCurrency:1,
            armor: 4,
            resistance: 2,
            strength: 13,
            dexterity: 15,
            intelligence: 13,
            constitution: 16,
            maxHP: 32,
            maxMP: 26,
            damage: 5,
            abilities: [],
            currentHP: 31,
            currentMP: 26,
            "kratabsFollyExplored": 0,
          "drippingDeathExplored": 0,
          "playersRespiteExplored": 0,
          "tailOfTheDragonExplored": 0,
          "thagragsHopeExplored": 0,
          "webOfDepthsExplored": 0,
          "graithsGrottoExplored": 0,
          "graithQueensLairExplored": 0,
          damageValue:10,
          armorValue: 1,
          evadePercentage: 10, 
          attackValue:10,
          resistValue:1
    };
    // component.combatant = expectedCombatant
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
