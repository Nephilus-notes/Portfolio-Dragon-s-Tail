import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Character } from '../models/character';
import { NPC } from '../models/npc';

@Injectable({
  providedIn: 'root'
})
export class CombatControllerService {

  playerCharacter!: Character;
  NPCEnemy!: NPC;

  attack(self:Character|NPC, target: Character|NPC): void {
    if (self.currentHP > 0) {
      let attack: number = Math.random() * 100;
      // this.messageService.add(`attack num : ${attack}`)
      // this.messageService.add(`damageValue ${self.name} ${self.damageValue}`)
      // this.messageService.add(`armorvalue: ${target.armorValue}`)
      if (attack === 100) {
        this.messageService.add(`${target.name} has been hit critically for ${self.damageValue * 2} damage!`, true)
        this.dealDamage(target, self.damageValue * 2)
      }
      else if (attack > target.evadePercentage) {
        var totalDamage = self.damageValue - target.armorValue // Math.random() * self.damage * .1

        if (totalDamage < 1) {
          totalDamage = 1;
        } 
          this.dealDamage(target, totalDamage)
        this.messageService.add(`${target.name} has been hit for ${totalDamage} damage!`, true)
        
      } else {
        this.messageService.add(`${self.name} missed ${target.name}`, true)
      } 
    }
  }

  dealDamage(char:Character|NPC, damage: number): void {
    if (damage > 0) {
      char.currentHP -= damage
    }
  }

  defend(self: Character): void {
    self.armorValue += 2
    this.messageService.add(`${self.name} focuses on defense`, true)
  }

  evade(self: Character): void {
    self.evadePercentage += 2
    this.messageService.add(`${self.name} focuses on evasion`, true)
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
    if (player.fleeing == true) {
      return false
    }
    if (player.currentHP <= 0) {
      player.currentHP = 0;
      this.messageService.add("You can no longer fight.", true)

      // Send back to town
      return false
    } else if (enemy.currentHP <= 0) {
      enemy.currentHP = 0;
      this.messageService.add(`You defeated the ${enemy.name}! You scavenge ${enemy.currentCurrency} Essence.`, true);
      this.gainLoot(player, enemy);

      return false
    } else {
      return true
    }
  }

  round(character: Character, enemy: NPC, actionCall: string) {
    // this.messageService.add(
    //   ` character ${this.character.dexterity} enemy ${this.enemy.dexterity}`
    // );
    if (character.dexterity >= enemy.dexterity) {
      this.playerAction(character, enemy, actionCall);
      this.attack(enemy, character);
    } else {
      this.attack(enemy, character);
      this.playerAction(character, enemy, actionCall);
    }
    // this.messageService.add(
    //   `combat check ${this.checkCombatants(
    //     character,
    //     enemy
    //   )}`
    // );

    // // this.CombatBool = 
    // this.checkCombatants(
    //   character,
    //   enemy
    // );
  }

  playerAction(character: Character, enemy: NPC, actionCall: string) {
    // this.messageService.add(`player action call ${actionCall}`);

    switch (actionCall) {
      case 'A': {
        this.attack(character, enemy);
        break;
      }
      case 'D': {
        this.defend(character);
        break;
      }
      case 'E': {
        this.evade(character);
        break;
      }
      case 'F': {
        this.flee(character, enemy);
        break;
      }
    }
  }

  gainLoot(character: Character, enemy: NPC): void {
    character.currentCurrency += enemy.currentCurrency;
    character.lifeTimeCurrency += enemy.currentCurrency;
  }

  // startCombat(player: Character, enemy:NPC) {
  //   this.setTempAttributes(player)
  //   this.setTempAttributes(enemy)
  // };

  // setTempAttributes(character: Character | NPC) {
  //   character.armorValue = character.armor;
  //   character.damageValue = character.equippedItems.hand?.itemStat ?
  //       character.equippedItems.hand?.itemStat + (character.strength / 2) : character.strength / 2;
  //   character.evadePercentage = character.dexterity;
  //   character.resistValue = character.resistance;
  //   character.attackValue = character.intelligence;
  // };

  constructor(private messageService: MessageService) { }
}
