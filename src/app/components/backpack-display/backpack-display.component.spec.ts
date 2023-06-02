import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackDisplayComponent } from './backpack-display.component';
import { Character } from '../../models/character';
import { ApiService } from 'src/app/services/api.service';
describe('BackpackDisplayComponent', () => {
  let component: BackpackDisplayComponent;
  let service: ApiService;
  let fixture: ComponentFixture<BackpackDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackDisplayComponent ]
    })
    .compileComponents();
    
    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(BackpackDisplayComponent);
    component = fixture.componentInstance;
    const expectedCharacter = {
      name: "Craelios",
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
    // component.character = expectedCharacter
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
