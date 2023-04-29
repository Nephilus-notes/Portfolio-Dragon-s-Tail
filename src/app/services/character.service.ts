import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { NPC } from '../models/npc';
import { MessageService } from './message.service';

import { environment } from 'src/environment/environment';
import { characterDTO } from '../models/characterDTO';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  constructor(private messageService: MessageService, private http:HttpClient) { }
  characterCache!: Character;
  npcCache!: Character;

  templateCache!: Array<Template>;
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
  public loadCharacter(): Character {
    this.messageService.add('Character Loaded from characterservice')
    return this.characterCache
  }

  public patchCharacter(character:Character): void {
    let url = `${environment.characterURL}${character.id}`
    let charDTO: characterDTO = {
      dateUpdated:new Date().toISOString(),
      ...character,
    }
    let response = this.http.patch<Character>(url, character)

    response.subscribe(p => console.warn(p))
    this.messageService.add("success, but how do we measure it?")
  }


  public postCharacter(character:Character): Observable<Character> {
    let url = `${environment.characterURL}`
    let date = new Date().toISOString()


    console.warn(date)

    let charDTO: characterDTO = {
      dateAdded:date,
      dateUpdated:date,
      ...character,
      id:undefined
      }
    let response = this.http.post<Character>(url, charDTO)
    console.warn(character)
      console.warn(charDTO)
    response.subscribe(r => console.warn(r))
    this.messageService.add("success, but how do we measure it?")
    return response
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

    getTemplates(): Observable<Array<Template>>{
      let url = `${environment.templateURL}`
      const templateList = this.http.get<Array<Template>>(url)
  
      this.messageService.add('CharacterService: fetched templates')
      return templateList;
    }

    cacheTemplates(templateList:Array<Template>): void {
      this.templateCache = templateList;
    }

    loadTemplates(): Array<Template> {
      return this.templateCache;
    }
}
