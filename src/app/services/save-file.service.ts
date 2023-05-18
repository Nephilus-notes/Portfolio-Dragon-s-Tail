import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

import { SaveFile } from '../models/saveFile';
import { Character } from '../models/character';
import { Char } from '../models/char';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  constructor(private messageService: MessageService, private http: HttpClient,
    private apiService: ApiService, public auth: AuthService) { }
saveIDCache?:number;
  
/**
 * Makes an API call to retrieve a savefile from the DB
 * @param saveID A number representing a saveFile's primary key
 * @returns a subscribable saveFile object
 */
  public getSaveFile(saveID:number): Observable<SaveFile>{

    let url = `${environment.saveFileURL}${saveID}`;

    // caching the save ID 
    this.cacheSaveID(saveID)
    console.warn(this.saveIDCache)
    return this.http.get<SaveFile>(url)
  }
  
  /**
   *Stores a retrieved saveFile's id in the cache to be used when patching the save
   * @param saveIDA number representing a saveFile's primary key
   */
  public cacheSaveID(saveID:number): void {
    this.saveIDCache = saveID;
  }

  /**
   * Checks the saveIDCache. If it's empty it then makes an API call to create a new saveFile associated with the logged in user. 
   * If there is a cached saveID it instead patches the savefile associated with that id.
   * Can be split into three functions: One to post, one to patch, and one to determine which is appropriate
   * @param locationID The string primary key of the location the player is currently at
   * @param character The entire character object
   */
  
  public postSaveFile(locationID: string,character: Character): void {
    this.auth.user$.subscribe(user => {

        this.messageService.add("posting new")
        var savedChar = this.apiService.postCharacter(character).subscribe(char => {
          this.messageService.add(`character id = ${char.id}`)
          let response = this.http.post<any>(`${environment.saveFileURL}`, {
          UserID:user?.sub,
          PlayerCharacterID:char.id,
          LocationID:locationID,
          characterName:character.name,
          DateAdded: new Date().toISOString(),
          DateUpdated: new Date().toISOString()
        })

        response.subscribe(r => {
          console.warn(r.id)
          this.cacheSaveID(r.id)
          console.warn(this.saveIDCache)
          console.warn(r);
        })
        })
      
    })
  };

  private patchSaveFile(locationID: string,character: Character): void {
    this.auth.user$.subscribe(user => {
    this.messageService.add("posting old")
    let saveToPost = {
      id:this.saveIDCache,
      UserID:user?.sub,
      PlayerCharacterID:character.id,
      LocationID:locationID,
      DateUpdated: new Date().toISOString(),
      CharacterName: character.name
    }
    console.warn(saveToPost)
    let response = this.http.patch(`${environment.saveFileURL}${this.saveIDCache}`, saveToPost)
    response.subscribe(r => console.warn(` response from savefile patch${r}`))
    this.apiService.patchCharacter(character)
    }
  )}

  public saveGame(locationID:string, character: Character): void {
    if (!this.saveIDCache) {
      this.postSaveFile(locationID, character);

    } 
    else {
      this.patchSaveFile(locationID, character)
    }
  }

  /**
   * Retrieves all the saveFiles associated with the logged in user's id
   * @param userID A string associated with the logged in user
   * @returns A subscribable array of saveFiles
   */
  public getUserSaveFiles(userID:string|undefined): Observable<Array<SaveFile>>{
    if (userID) {

      let url = `${environment.saveFileURL}user/${userID}`;
      // console.warn(url)

      return this.http.get<Array<SaveFile>>(url)
      
      // caching the save ID 
    }
    else {
      console.warn(`string = ${userID}`)
      return this.http.get<Array<SaveFile>>(`${environment.saveFileURL}`)
    }
  }
}
