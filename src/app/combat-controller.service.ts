import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CombatControllerService {

  attack(self:Character, target: Character): number {
    let attack: number = Math.random() * 100;
    if (attack === 100) {
      this.messageService.add(`${target.name} has been hit critically for ${self.damage * 2} damage!`, true)
      return self.damage * 2
    }
    else if (attack > target.dexterity) {
      let totalDamage = self.damage - target.armor // Math.random() * self.damage * .1
      this.messageService.add(`${target.name} has been hit for ${totalDamage} damage!`, true)
      return totalDamage
    } else {
      this.messageService.add(`${self.name} missed ${target.name}`, true)
      return 0
    }
  }

  defend(self: Character): void {
    self.armor += 2
  }

  evade(self: Character): void {
    self.dexterity += 2
  }

  flee(self: Character, target: Character): boolean {
    if (self.dexterity > target.dexterity) {
      return true
    }
    else {
      return false
    }
  }

  constructor(private messageService: MessageService) { }
}
