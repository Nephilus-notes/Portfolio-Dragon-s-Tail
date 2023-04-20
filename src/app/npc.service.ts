import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './services/message.service';

import { NPC } from './npc';

@Injectable({
  providedIn: 'root'
})
export class NpcService {
  getEnemy(): Observable<NPC> {
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
    });
    this.messageService.add('CharacterService: fetched characters')
    return Enemy;
  }
  constructor(private messageService: MessageService) { }
}
