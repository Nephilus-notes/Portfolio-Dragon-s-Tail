import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInfoComponent } from './character-info.component';

describe('CharacterInfoComponent', () => {
  let component: CharacterInfoComponent;
  let fixture: ComponentFixture<CharacterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterInfoComponent);
    component = fixture.componentInstance;

    const expectedCharacter = {
      name: "Craelios",
      bag: [
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
    component.character = expectedCharacter
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
