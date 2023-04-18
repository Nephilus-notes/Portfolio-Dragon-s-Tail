import { Injectable } from '@angular/core';

import { MessageService } from '../message.service';
import { LocationService } from '../location.service';
import { CharacterService } from '../character.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environment/environment';

import { SaveFile } from '../models/saveFile';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {
  constructor(private messageService: MessageService, private http: HttpClient,
    private characterService: CharacterService, private locationService: LocationService) { }

  
  getSaveFile(saveID:number): Observable<SaveFile>{

    let url = `https://localhost:7212/api/SaveFileS/${saveID}`;

    return this.http.get<SaveFile>(url)
  }
}
