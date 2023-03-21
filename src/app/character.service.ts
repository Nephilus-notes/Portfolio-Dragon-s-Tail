import { Injectable } from '@angular/core';
import { Character } from './character';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactercache!: Character;
  /** 
  * Asynchronous function to perform an api call to retrieve the character based on its ID
  *
  * @returns A character object 
  *
  *
  *
  */
  getCharacter(): Observable<Character> {
    const character = of({
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
    {id: 3, 'name': 'Leather Armor',
        'itemStat': 1, 'price': 20, "slot": "body",
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
      current_hp: 32,
      current_mp: 26,
    });
    this.messageService.add('CharacterService: fetched characters')
    return character;
  }
  /** 
  * Caches the retrieved character into state so it can be accessed by other components 
  * without extraneous API calls
  *
  * @param character - Character type object to be cached
  * @returns none
  *
  */
  saveCharacter(character:Character) {
    this.charactercache = character
    this.messageService.add('Progress Saved')
  }
  /** 
  * Loads a character from the CharacterService cache without an API call
  *
  * @param none
  * @returns none
  *
  *
  */
  loadCharacter() {
    this.messageService.add('Character Loaded')
    return this.charactercache
  }
  exists() {
    if (this.charactercache) {
      this.messageService.add('Character exists!')
      return true
    }
    else {
      this.messageService.add("Character doesn't exist")
      return false
    }
  }
  constructor(private messageService: MessageService) { }
}
