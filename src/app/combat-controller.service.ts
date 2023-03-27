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
      var totalDamage = self.damage - target.armor // Math.random() * self.damage * .1
      this.messageService.add(`${target.name} has been hit for ${totalDamage} damage!`, true)
      if (totalDamage > 1) {
        return totalDamage
      } else {
        return 1
      }
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
      this.messageService.add(`${self.name} has fled!`, true)
      return true
    }
    else {
      this.messageService.add(`${self.name} tried to flee!`, true)
      return false
    }
  }

  Delay(time:number): Promise<boolean> {
    return new Promise(resolve => setTimeout(resolve, time))
  }
  checkCombatants(player: Character, enemy:Character): boolean {
    if (player.current_hp <= 0) {
      player.current_hp = 0;
      this.messageService.add("You can no longer fight. You return home", true)

      // Send back to town
      return false
    } else if (enemy.current_hp <= 0) {
      enemy.current_hp = 0;
      this.messageService.add(`You defeated the ${enemy.name}! You might get some reward from this eventually.`, true)

      return false
    } else {
      return true
    }
  }

  constructor(private messageService: MessageService) { }
}
