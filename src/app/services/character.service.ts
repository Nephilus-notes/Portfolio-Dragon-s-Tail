import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { NPC } from '../models/npc';
import { MessageService } from './message.service';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private messageService: MessageService, private http:HttpClient) { }
  characterIDCache!: number;
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
  
    let url = `${environment.characterURL}${charID}`
    const character = this.http.get<Character>(url)

    this.messageService.add('CharacterService: fetched characters')
    return character;
  }

  /** 
  * Caches the retrieved character into state so it can be accessed by other components 
  * without extraneous API calls
  *
  * @param character - Character type object to be cached
  * @param charID - temp param until character has an id field on it.
  * @returns none
  *
  */
  cacheCharacter(character:Character, charID: number|null = null) {
    // console.warn(`character cache: ${character}`)
    this.characterCache = character
    if (charID != null) {

      this.characterIDCache = charID
    }
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
  public loadCharacter(): Character {
    this.messageService.add('Character Loaded from characterservice')
    return this.characterCache
  }

  public patchCharacter(charID:number, character:Character): void {
    let url = `${environment.characterURL}${charID}`
    let response = this.http.patch<Character>(url, character)

    this.messageService.add("success, but how do we measure it?")
  }


  public postCharacter(character:Character): void {
    let url = `${environment.characterURL}`
    this.http.patch<Character>(url, character)

    this.messageService.add("success, but how do we measure it?")
  }
  /**
   * Checks to see if a character has been cached
   * 
   * @returns - Boolean
   */
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
          head:null,
          body:null,
          hand: null
      },
        armor: 1,
        resistance: 2,
        strength: 13,
        dexterity: 15,
        intelligence: 13,
        constitution: 16,
        maxHP: 20,
        maxMP: 26,
        damageValue: 5,
        armorValue: 1,
        attackValue: 13,
        evadePercentage: 15,
        resistValue: 0,
        abilities: [['a', {name:"attack"}], ['d',{name:"defend"}],['g',{name:"dodge"}],['f',{name:"flee"}]],
        currentHP: 20,
        currentMP: 26,
      });
      this.messageService.add('CharacterService: generated enemy', true)
      return npc;
    }
}
