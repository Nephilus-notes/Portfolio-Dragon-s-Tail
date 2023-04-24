import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

import { environment } from 'src/environment/environment';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private messageService: MessageService, private http:HttpClient) { }

  getCharacterTemplate(TemplateID: String): Observable<Template> {
  
    let url = `${environment.templateURL}${TemplateID}`
    const character = this.http.get<Template>(url)

    this.messageService.add('CharacterService: fetched characters')
    return character;
  };
  
}
