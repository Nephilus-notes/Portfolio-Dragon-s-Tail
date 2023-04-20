import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  getItem(itemID: number): Observable<Item> {
  
    let url = `${environment.itemURL}${itemID}`
    const item = this.http.get<Item>(url)
    this.messageService.add('CharacterService: fetched characters')
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
  constructor(private messageService: MessageService, private http:HttpClient) { }
}
