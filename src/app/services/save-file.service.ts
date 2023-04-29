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
    console.warn(this.saveIDCache)
    return this.http.get<SaveFile>(url)
  }

  postSaveFile(locationID: string,character: Character): void {
    this.auth.user$.subscribe(user => {

      if (!this.saveIDCache) {
        this.messageService.add("posting new")
        var savedChar = this.characterService.postCharacter(character).subscribe(p => {
          let response = this.http.post(`${environment.saveFileURL}`, {
          UserID:user?.sub,
          PlayerCharacterID:p.id,
          LocationID:locationID,
          DateAdded: new Date().toISOString(),
          DateUpdated: new Date().toISOString()
        })
        response.subscribe(r => console.warn(r))

        })
        
      } 
      else  {
        this.messageService.add("posting old")

        let response = this.http.patch(`${environment.saveFileURL}${this.saveIDCache}`, {
          UserID:user?.sub,
          PlayerCharacterID:character.id,
          LocationID:locationID,
          DateUpdated: Date.UTC.toString()
        })
        this.characterService.patchCharacter(character)
      }
    })
  };
}
