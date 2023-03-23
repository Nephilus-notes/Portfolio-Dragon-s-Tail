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
    } else {
      this.messages.push(message)
    }
  }

  clear() {
    this.messages = []
  }
}
