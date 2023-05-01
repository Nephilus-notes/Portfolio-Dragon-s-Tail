import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { Character } from '../models/character';
import { NPC } from '../models/npc';
import { Char } from '../models/char';

@Injectable({
  providedIn: 'root'
})
export class CombatControllerService {

  playerCharacter!: Character;
  NPCEnemy!: NPC;

  attack(self:Character|NPC, target: Character|NPC, type:string="physical"): void {
    let attack: number = Math.random() * 100;

    if (attack === 100) {
      this.messageService.add(`${target.name} has been hit critically for ${self.damageValue * 2} damage!`, true)
      this.dealDamage(target, self.damageValue * 2)
    }
    else if (attack > target.evadePercentage) {
      var totalDamage = self.damageValue - target.armorValue + Math.floor(Math.random() * self.damageValue * .1)

      if (totalDamage < 1) {
        totalDamage = 1;
      } 
        this.dealDamage(target, totalDamage)
      this.messageService.add(`${target.name} has been hit for ${totalDamage} damage!`, true)
      
    } else {
      this.messageService.add(`${self.name} missed ${target.name}`, true)
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

  public heal(self:Character|NPC, amountHealed:number): void {
    self.currentHP += amountHealed;
    if (self.currentHP > self.maxHP) {
      self.currentHP = self.maxHP;
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

    if (character.dexterity >= enemy.dexterity) {
      this.playerAction(character, enemy, actionCall);
      if (enemy.currentHP > 0) {
        this.attack(enemy, character);
      }
    } else {
      this.attack(enemy, character);
      if (character.currentHP > 0) {
        this.playerAction(character, enemy, actionCall);
      }
    }

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


  public performAbility(self: Character| NPC, target: Character| NPC, effect:string, affectedAttribute:string, modifier:number=1, duration:number=0, type:string="physical" ) {
    if (effect == "damage") {
      if (type == "physical") {
        self.damageValue = self.damageValue * modifier;
        this.attack(self, target);
        self.resetDamageValue();
      } else if (type == "magical") {
        // attack but using magic against resistance
      }
      if (affectedAttribute) {
        this.debuff(target, affectedAttribute, duration);
      }
    }
    else if (effect == "heal") {
      this.heal(target, self.magicValue*modifier)
      // target.currentHP += self.attackValue * modifier; // attackValue will change to magic value
      // if (target.currentHP > target.maxHP) {
      //   target.currentHP = target.maxHP;
      // }
    }
    if (effect == "buff") {
      switch (affectedAttribute) {
        case "stoneArmored": {
          self.armorValue += Math.floor(self.attackValue) * modifier;
          self.stoneArmored = true;
          self.stoneArmoredRounds = duration;
          break;
        }
        case "stoneFists": {
          self.damageValue += Math.floor(self.attackValue) * modifier;
          self.stoneFists = true
        }
      }
      if (affectedAttribute == "damageValue") {
      } 
      else if (affectedAttribute == "resistValue") {
        self.resistValue += Math.floor(self.attackValue) * modifier;
      }
      else if (affectedAttribute == "armorValue") {
      }
      else if (affectedAttribute == "evadePercentage") {
        self.evadePercentage += Math.floor(self.attackValue) * modifier;
      }
      else if (affectedAttribute == "attackValue") {
        self.attackValue += Math.floor(self.attackValue) * modifier;
      }
      else if (affectedAttribute == "magicValue") {
        self.magicValue += Math.floor(self.attackValue) * modifier;
      }
    }
  }

  public debuff(target:Character| NPC, affectedAttribute:string, duration:number) {
    switch (affectedAttribute) {
      case "poisoned" : {
        target.poisoned = true;
        target.poisonedRounds = duration;
        break;
      }
      case "slowed" : {
        target.slowed = true;
        target.slowedRounds = duration;
        break;
      }
      case "vulnerable" : {
        target.vulnerable = true;
        target.vulnerableRounds = duration;
        break;
      }
      case "hitByWind" : {
        target.hitByWind = true;
        break;
      }
      case "stunned" : {
        target.stunned = true;
        break;
      }
      case "burning" : {
        target.burning = true;
        break;
      }
    }
  }

  constructor(private messageService: MessageService) { }
}
