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

  /**
   * Generates a random number to determine if a critical hit happened,
   * then checks against the targets evasion to see if they are hit,
   * finally calculates damage if they are hit and calls the dealDamage function.
   * @param self The player or non player character doing the attacking
   * @param target The target of the violence
   * @param type A string with a default value of physical, but a value of magical would change 
   * the stats tested
   */
  public attack(self:Character|NPC, target: Character|NPC, type:string="physical"): void {
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

  /**
   * Deals damage to the char equal to the damage passed in.
   * @param char The player or non player character that is recieving damage
   * @param damage The amount of damage recieved
   */
  public dealDamage(char:Character|NPC, damage: number): void {
    if (damage > 0) {
      char.currentHP -= damage
    }
  }

  /**
   * LEGACY an ability the player can use to briefly boost their armor
   * @param self the character performing the action
   */
  public defend(self: Character): void {
    self.armorValue += 2
    this.messageService.add(`${self.name} focuses on defense`, true)
  }

  /**
   * LEGACY an ability the player can use to briefly boost their evasion
   * @param self the character performing the action
   */
  public evade(self: Character): void {
    self.evadePercentage += 2
    this.messageService.add(`${self.name} focuses on evasion`, true)
  }

  /**
   * an ability used to try to escape combat.
   * @param self the player or non player character using the ability
   * @param target The enemy whose speed is being compared
   * @returns A boolean. true = self is faster and will leave combat. false = the enemy is faster and self cannot escape
   */
  public flee(self: Character|NPC, target: Character|NPC): boolean {
    if (self.dexterity > target.dexterity) {
      this.messageService.add(`${self.name} has fled!`, true)
      return true
    }
    else {
      this.messageService.add(`${self.name} tried to flee!`, true)
      return false
    }
  }
  /**
   * Heals the character by the amount passed in.
   * @param self the pc or npc to be healed
   * @param amountHealed The amount of hp regained
   */
  public heal(self:Character|NPC, amountHealed:number): void {
    self.currentHP += amountHealed;
    if (self.currentHP > self.maxHP) {
      self.currentHP = self.maxHP;
    }
  }

  /**
   * Used at the end of a round, it ensures both combatants are able to continue fighting, and if not returns false and ends combat.
   * @param player 
   * @param enemy 
   * @returns 
   */
  public checkCombatants(player: Character, enemy:NPC): boolean {
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
/**
 * Checks to make sure all parties can attack and can be attacked
 * @param player The current player character
 * @param npc  The current enemy in combat 
 * @param actionCall The player's input as a string 
 */
  public healthCheck(player:Character, npc: NPC, actionCall: string | null=null) {
    if (actionCall == null && player.currentHP > 0 && npc.currentHP > 0) {
      this.attack(npc, player);
    }
    else if (player.currentHP > 0 && npc.currentHP > 0) {
      if (actionCall != null) {
        this.playerAction(player, npc, actionCall)
      }
    }
  }
  /**
   * A combat round. Uses the two combatants' dexterity to determine order then makes the enemy attack the player and 
   * performs whatever action dictated by the actionCall string the player submitted
   * @param character 
   * @param enemy 
   * @param actionCall 
   */
  public round(character: Character, enemy: NPC, actionCall: string) {

    if (character.dexterity >= enemy.dexterity) {
      this.healthCheck(character, enemy, actionCall);
      if (enemy.currentHP > 0) {
        this.healthCheck(character, enemy);
      }
    } else {
      this.healthCheck(character, enemy);
      if (character.currentHP > 0) {
        this.healthCheck(character, enemy, actionCall);
      }
    }

  }

  /**
   * A switch that determines which legacy ability the player uses. [Attack, Defend, Evade, Flee]
   * @param character 
   * @param enemy 
   * @param actionCall 
   */
  public playerAction(character: Character, enemy: NPC, actionCall: string) {
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

  /**
   * Takes the essence from the slain enemy and adds it to the players currentCurrency
   * @param character 
   * @param enemy 
   */
  private gainLoot(character: Character, enemy: NPC): void {
    character.currentCurrency += enemy.currentCurrency;
    character.lifeTimeCurrency += enemy.currentCurrency;
  }

/**
 * New function designed to take in an ability object and us it to perform an action
 * @param self The PC or NPC using the ability
 * @param target The target of the abiity
 * @param effect A string: options "damage", "heal", "buff", and "debuff"?
 * @param affectedAttribute A string that maps to a particular attribute on the character object
 * @param modifier A number that increases the effect of the ability
 * @param duration A number indicating the number of rounds the effect persists
 * @param type A string: "physical" and "magical" indicating which attribute should be used for damage (strength vs intelligence) against which defense (armor vs resistance)
 */
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
