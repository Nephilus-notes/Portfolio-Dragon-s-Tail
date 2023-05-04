import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/assets/environment/environment';

import { SaveFile } from '../models/saveFile';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  constructor(private messageService: MessageService, private http: HttpClient,
    private apiService: ApiService, public auth: AuthService) { }
saveIDCache!:number;
  
  getSaveFile(saveID:number): Observable<SaveFile>{

    let url = `${environment.saveFileURL}${saveID}`;

    // caching the save ID 
    this.cacheSaveID(saveID)
    console.warn(this.saveIDCache)
    return this.http.get<SaveFile>(url)
  }
  
  cacheSaveID(saveID:number): void {
    this.saveIDCache = saveID;
  }

  postSaveFile(locationID: string,character: Character): void {
    this.auth.user$.subscribe(user => {

      if (!this.saveIDCache) {
        this.messageService.add("posting new")
        var savedChar = this.apiService.postCharacter(character).subscribe(p => {
          let response = this.http.post<any>(`${environment.saveFileURL}`, {
          UserID:user?.sub,
          PlayerCharacterID:p.id,
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
        
      } 
      else  {
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
        response.subscribe(r => console.warn(r))
        this.apiService.patchCharacter(character)
      }
    })
  };

  getUserSaveFiles(userID:string|undefined): Observable<Array<SaveFile>>{
    if (userID) {

      let url = `${environment.saveFileURL}user/${userID}`;
  
      return this.http.get<Array<SaveFile>>(url)
      // caching the save ID 
    }
    else {
      console.warn(`string = ${userID}`)
      return this.http.get<Array<SaveFile>>(`${environment.saveFileURL}`)
    }
  }
}
