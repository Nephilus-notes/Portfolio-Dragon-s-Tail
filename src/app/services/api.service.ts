import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { Item } from '../models/item';
import { environment } from 'src/assets/environment/environment';
import { characterDTO } from '../models/characterDTO';
import { Character } from '../models/character';
import { NPC } from '../models/npc';
import { Template } from '../models/template';
import { Location } from '../models/mapLocation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private messageService: MessageService, private http:HttpClient) { }
  characterCache!: Character;
  npcCache!: Character;
  locationCache!:Location;
  locations!: Location[];

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


  // public clearCharacterCache(): void {
  //   delete this.characterCache
  // }
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
    let response = this.http.patch<Character>(url, charDTO)

    response.subscribe(p => console.warn(p))
    this.messageService.add("success, but how do we measure it?")
  }


  public postCharacter(character:Character): Observable<Character> {
    let url = `${environment.characterURL}`
    let date = new Date().toISOString()


    // console.warn(date)

    let charDTO: characterDTO = {
      dateAdded:date,
      dateUpdated:date,
      ...character,
      id:undefined
      }
    let response = this.http.post<Character>(url, charDTO)
    // console.warn(character)
      // console.warn(charDTO)
    response.subscribe(r => {
      character.id = r.id;
      console.warn(r);
    })
    this.messageService.add("success, but how do we measure it?")
    return response
  }
  /**
   * Checks to see if a character has been cached
   * 
   * @returns - Boolean
   */
  characterCacheExists() {
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
    getEnemy(NPCID:number): Observable<NPC> {

      let url = `${environment.NpcURL}${NPCID}`
    const enemy = this.http.get<NPC>(url)

    this.messageService.add('CharacterService: fetched enemy')
    return enemy;

    }

    getTemplates(): Observable<Array<Template>>{
      let url = `${environment.templateURL}`
      const templateList = this.http.get<Array<Template>>(url)
  
      this.messageService.add('CharacterService: fetched templates')
      return templateList;
    }

    cacheTemplates(templateList:Array<Template>): void {
      this.templateCache = templateList;
    };

    loadTemplates(): Array<Template> {
      return this.templateCache;
    };

    templateCacheExists() {
      if (this.templateCache) {
        this.messageService.add('Templates exists!')
        return true
      }
      else {
        this.messageService.add("Templates don't exist")
        return false
      }
    };

    getItem(itemID: number): Observable<Item> {
  
      let url = `${environment.itemURL}${itemID}`
      const item = this.http.get<Item>(url)
      this.messageService.add('ItemService: Item Fetched')
      return item;
    }
  
    getItems(idList:Array<number>): Array<Observable<Item>> {
      let items = new Array<Observable<Item>>
  
      for(let i = 0; i < idList.length; i ++) {
        let url = `${environment.itemURL}${idList[i]}`
        items[i] = this.http.get<Item>(url)
      }
      return items
    }

    /**
   * Takes in a location ID, makes an api call to retrieve the location object 
   * associated with that ID, and returns it
   * 
   * @param loc_id - An id associated with a new location object, most likely a 
   * sanitized user input
   * @returns a location object
   */
  getNewLocation(loc_id:string): Observable<Location> {
    let url = `${environment.locationURL}${loc_id}`;

    const location = this.http.get<Location>(url)
    return location
  }

  saveLocation(location:Location): void {
    this.locationCache = location
    // console.warn(location)
    this.messageService.add('location Saved')
  }
  /** 
  * Loads a location from the CharacterService cache without an API call
  *
  * @param none
  * @returns a location object
  *
  *
  */
  loadLocation(): Location {
    this.messageService.add('location Loaded')
    return this.locationCache
  }

  cacheExists(): boolean {
    if(this.locationCache) {
      return true
    }
    return false
  }

  getLocations() {

    let url = environment.locationURL;

    return this.http.get<any>(url)
  }

  getCharacterTemplate(TemplateID: String): Observable<Template> {
  
    let url = `${environment.templateURL}${TemplateID}`
    const character = this.http.get<Template>(url)

    this.messageService.add('CharacterService: fetched characters')
    return character;
  };
  }