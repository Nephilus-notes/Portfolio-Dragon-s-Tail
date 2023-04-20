import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackpackDisplayComponent } from './backpack-display.component';
import { Character } from '../../character';
import { CharacterService } from '../../services/character.service';

describe('BackpackDisplayComponent', () => {
  let component: BackpackDisplayComponent;
  let service: CharacterService;
  let fixture: ComponentFixture<BackpackDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackpackDisplayComponent ]
    })
    .compileComponents();
    
    service = TestBed.inject(CharacterService);
    fixture = TestBed.createComponent(BackpackDisplayComponent);
    component = fixture.componentInstance;
    const expectedCharacter = {
      name: "Craelios",
      bag: [
        {id: 1,
      'name': "Death's Scythe",
      'itemStat': 15, 'price': 500, "slot": "Hand",
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
        'Head':null,
        'Body':{id:3,
      'name': 'Leather Armor',
      'itemStat': 1, 'price': 20, "slot": "body",
      'description': 
    `Toughened leather 
    Protects against
    both elements and enemies.`},
        Hand: null
    },
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
    };
    component.character = expectedCharacter
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
