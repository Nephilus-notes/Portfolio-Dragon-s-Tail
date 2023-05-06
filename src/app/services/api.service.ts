import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { Item } from '../models/item';
import { environment } from 'src/environments/environment';
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
/**
 * Stored values for building a character during the new game process
 */
  templateCache!: Array<Template>;
  /** 
  * Asynchronous function to perform an api call to retrieve the character based on its ID
  * @param charID a number associated with a character in the database
  * @returns An observable of a  full character object ready to be loaded
  */
  public getCharacter(charID: number): Observable<Character> {
  
    let url = `${environment.characterURL}${charID}`
    const character = this.http.get<Character>(url)

    this.messageService.add('CharacterService: fetched characters')
    return character;
  }

  /** 
  * Caches the retrieved character into state so it can be accessed by other components 
  * and views without extraneous API calls
  *
  * @param character - Character type object to be cached
  * @param charID - temp param until character has an id field on it.
  * @returns none
  *
  */
  public cacheCharacter(character:Character) {
    // console.warn(`character cache: ${character}`)
    this.characterCache = character
    this.messageService.add('character cached')
  }
  
  /** 
  * Loads a character from the CharacterService cache without an API call
  * @param none
  * @returns A character object
  */
  public loadCharacter(): Character {
    this.messageService.add('Character Loaded from characterservice')
    return this.characterCache
  }

  /**
   * Makes an api call to save the character's changes into the database
   * @param character The current player character
   */
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

/**
   * API call to the database to save a new character
   * @param character 
   * @returns An observable of the newly saved character object.  
   */
  public postCharacter(character:Character): Observable<Character> {
    let url = `${environment.characterURL}`
    let date = new Date().toISOString()

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
  public characterCacheExists() {
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
    * Asynchronous function to perform an api call to retrieve an NPC's base values using  its ID
    *
    * @returns An observable NPC object 
    */
    public getEnemy(NPCID:number): Observable<NPC> {

      let url = `${environment.NpcURL}${NPCID}`
    const enemy = this.http.get<NPC>(url)

    this.messageService.add('CharacterService: fetched enemy')
    return enemy;
    }

    /**
     * Retrieves all character default values for players to choose their start
     * @returns An observable that contains an array of character default objects
     */
    public getTemplates(): Observable<Array<Template>>{
      let url = `${environment.templateURL}`
      const templateList = this.http.get<Array<Template>>(url)
  
      this.messageService.add('CharacterService: fetched templates')
      return templateList;
    }

    /**
     * Takes a list of character defaults and caches them to persist across component changes
     * @param templateList 
     */
    public cacheTemplates(templateList:Array<Template>): void {
      this.templateCache = templateList;
    };

     /**
     * 
     * @returns An array of all default character objects 
     */
    public loadTemplates(): Array<Template> {
      return this.templateCache;
    };

     /**
     * Checks to see if a templateCache has been instantiated
     * 
     */
    public templateCacheExists(): boolean {
      if (this.templateCache) {
        this.messageService.add('Templates exists!')
        return true
      }
      else {
        this.messageService.add("Templates don't exist")
        return false
      }
    };

    /**
     * API call to retrieve an item object from the database
     * @param itemID the item's primary key
     * @returns an observable of an item from the database
     */
    public getItem(itemID: number): Observable<Item> {
  
      let url = `${environment.itemURL}${itemID}`
      const item = this.http.get<Item>(url)
      this.messageService.add('ItemService: Item Fetched')
      return item;
    }
  
    
    /**
     * Makes multiple API calls for items based on primary keys in the idList
     * @param idList a list of primary keys
     * @returns an array of observables
     */
    public getItems(idList:Array<number>): Array<Observable<Item>> {
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
  public getNewLocation(loc_id:string): Observable<Location> {
    let url = `${environment.locationURL}${loc_id}`;

    const location = this.http.get<Location>(url)
    return location
  }

  public saveLocation(location:Location): void {
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
  public loadLocation(): Location {
    this.messageService.add('location Loaded')
    return this.locationCache
  }

  /**
   * Checks if a location has been stored in state
   * @returns a boolean 
   */
  public cacheExists(): boolean {
    if(this.locationCache) {
      return true
    }
    return false
  }

  /**
   * Gets a list of all locations in the database
   * @returns an Observable of an arary of location objects
   */
  public getLocations(): Observable<Array<Location>> {

    let url = environment.locationURL;

    return this.http.get<Array<Location>>(url)
  }

  /**
   * API call to retrieve a single character default template from the database
   * @returns An observable of a character default template
   */
  public getCharacterTemplate(TemplateID: String): Observable<Template> {
  
    let url = `${environment.templateURL}${TemplateID}`
    const template = this.http.get<Template>(url)

    this.messageService.add('API: got single template')
    return template;
  };
  }