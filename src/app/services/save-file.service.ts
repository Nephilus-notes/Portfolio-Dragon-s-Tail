import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { LocationService } from './location.service';
import { CharacterService } from './character.service';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';

import { SaveFile } from '../models/saveFile';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  constructor(private messageService: MessageService, private http: HttpClient,
    private characterService: CharacterService, private locationService: LocationService,
    public auth: AuthService) { }
saveIDCache!:number;
  
  getSaveFile(saveID:number): Observable<SaveFile>{

    let url = `${environment.saveFileURL}${saveID}`;

    // caching the save ID 
    this.saveIDCache = saveID;

    return this.http.get<SaveFile>(url)
  }

  postSaveFile(locationID: number, characterID: number, character: Character): void {
    this.auth.user$.subscribe(user => {

      if (!this.saveIDCache) {
        this.http.post(`${environment.saveFileURL}`, {
          UserID:user?.sub,
          PlayerCharacterID:characterID,
          LocationID:locationID,
          DateAdded: Date.UTC.toString(),
          DateUpdated: Date.UTC.toString()
        })
        this.characterService.postCharacter(character)
      } 
      else  {

        this.http.patch(`${environment.saveFileURL}${this.saveIDCache}`, {
          UserID:user?.sub,
          PlayerCharacterID:characterID,
          LocationID:locationID,
          DateUpdated: Date.UTC.toString()
        })
        this.characterService.patchCharacter(this.characterService.characterIDCache,character)
      }
    })
  };
}
