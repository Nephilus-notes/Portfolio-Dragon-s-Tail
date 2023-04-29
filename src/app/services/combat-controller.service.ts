import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Character } from '../models/character';
import { NPC } from '../models/npc';

@Injectable({
  providedIn: 'root'
})
export class CombatControllerService {

  attack(self:Character|NPC, target: Character|NPC): number {
    let attack: number = Math.random() * 100;
    // this.messageService.add(`attack num : ${attack}`)
    // this.messageService.add(`damageValue ${self.name} ${self.damageValue}`)
    // this.messageService.add(`armorvalue: ${target.armorValue}`)
    if (attack === 100) {
      this.messageService.add(`${target.name} has been hit critically for ${self.damageValue * 2} damage!`, true)
      return self.damageValue * 2
    }
    else if (attack > target.evadePercentage) {
      var totalDamage = self.damageValue - target.armorValue // Math.random() * self.damage * .1
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
    self.armorValue += 2
  }

  evade(self: Character): void {
    self.evadePercentage += 2
  }

  flee(self: Character|NPC, target: Character|NPC): boolean {
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
  
  checkCombatants(player: Character, enemy:NPC): boolean {
    if (player.currentHP <= 0) {
      player.currentHP = 0;
      this.messageService.add("You can no longer fight. You return home", true)

      // Send back to town
      return false
    } else if (enemy.currentHP <= 0) {
      enemy.currentHP = 0;
      this.messageService.add(`You defeated the ${enemy.name}! You might get some reward from this eventually.`, true)

      return false
    } else {
      return true
    }
  }

  startCombat(player: Character, enemy:NPC) {
    this.setTempAttributes(player)
    this.setTempAttributes(enemy)
  };

  setTempAttributes(character: Character | NPC) {
    character.armorValue = character.armor;
    character.damageValue = character.equippedItems.hand?.itemStat ?
        character.equippedItems.hand?.itemStat + (character.strength / 2) : character.strength / 2;
    character.evadePercentage = character.dexterity;
    character.resistValue = character.resistance;
    character.attackValue = character.intelligence;
  };

  constructor(private messageService: MessageService) { }
}
