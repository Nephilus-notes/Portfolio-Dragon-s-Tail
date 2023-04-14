import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from './character';
import { NPC } from './npc';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private messageService: MessageService, private http:HttpClient) { }

  characterCache!: Character;
  npcCache!: Character
  /** 
  * Asynchronous function to perform an api call to retrieve the character based on its ID
  *
  * @returns A character object 
  *
  *
  *
  */
  getCharacter(charID: number): Observable<Character> {
  
    // let url = `https://localhost:7212/api/PlayerCharacters/${charID}`
    // const character = this.http.get<Character>(url)
    this.messageService.add('CharacterService: fetched characters')

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
      "kratabsFollyExplored": 0,
    "drippingDeathExplored": 0,
    "playersRespiteExplored": 0,
    "tailOfTheDragonExplored": 0,
    "thagragsHopeExplored": 0,
    "webOfDepthsExplored": 0,
    "graithsGrottoExplored": 0,
    "graithQueensLairExplored": 0,
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
  cacheCharacter(character:Character) {
    // console.warn(`character cache: ${character}`)
    this.characterCache = character
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
    this.messageService.add('Character Loaded from characterservice')
    return this.characterCache
  }
  exists() {
    if (this.characterCache) {
      this.messageService.add('Character exists!')
      return true
    }
    else {
      this.messageService.add("Character doesn't exist")
      return false
    }
  }

 
    /** 
    * Asynchronous function to perform an api call to retrieve the character based on its ID
    *
    * @returns A character object 
    *
    *
    *
    */
    getEnemy(): Observable<NPC> {
      const npc = of({
        name: "Krakt Rat",
        bag: [],
        equippedItems: {
          Head:null,
          Body:null,
          Hand: null
      },
        armor: 1,
        resistance: 2,
        strength: 13,
        dexterity: 15,
        intelligence: 13,
        constitution: 16,
        maxHP: 20,
        maxMP: 26,
        damage: 5,
        abilities: [['a', {name:"attack"}], ['d',{name:"defend"}],['g',{name:"dodge"}],['f',{name:"flee"}]],
        currentHP: 20,
        currentMP: 26,
      });
      this.messageService.add('CharacterService: generated enemy', true)
      return npc;
    }
}
