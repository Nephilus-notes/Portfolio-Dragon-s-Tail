import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class NpcService {
  getEnemy(): Observable<Character> {
    const Enemy = of({
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
    });
    this.messageService.add('CharacterService: fetched characters')
    return Enemy;
  }
  constructor(private messageService: MessageService) { }
}
