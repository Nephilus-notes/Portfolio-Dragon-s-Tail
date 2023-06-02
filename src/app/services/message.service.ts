import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = []
  combatMessages: string[] = []

  add(message: string, combat:boolean=false) {
    if (combat) {
      this.combatMessages.push(message)
      if (this.combatMessages.length > 6) {
        this.combatMessages.shift()
      }
    } else {
      this.messages.push(message)
    }
  }

  clear(combat:boolean=false) {
    if (combat) {
      this.combatMessages = []
    } else {
      this.messages = []
    }
  }
  
}
