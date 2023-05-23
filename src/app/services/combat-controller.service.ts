import { Injectable, OnChanges } from '@angular/core';

import { MessageService } from './message.service';
import { Character } from '../models/character';
import { NPC } from '../models/npc';
import { Char } from '../models/char';
import { Ability } from '../models/ability';

@Injectable({
  providedIn: 'root',
})
export class CombatControllerService {
  constructor(private messageService: MessageService) {}

  playerCharacter!: Character;
  NPCEnemy!: NPC;
  roundCounters!: Array<number>;
  booleanAttributes!: Array<boolean>;
  roundOrder?: Array<Character | NPC>;
  resetArray!: Array<Function>;
  // NPCRoundCounters?: Array<number>;
  // NPCBooleanAttributes?: Array<boolean>;

  public cacheNPC(npc: NPC): void {
    this.NPCEnemy = npc;
  }

  public cachePC(character: Character): void {
    this.playerCharacter = character;
  }

  public combatPCExists(): boolean {
    if (this.playerCharacter) {
      return true;
    }
    return false;
  }

  /**
   * Generates a random number to determine if a critical hit happened,
   * then checks against the targets evasion to see if they are hit,
   * finally calculates damage if they are hit and calls the dealDamage function.
   * @param self The player or non player character doing the attacking
   * @param target The target of the violence
   * @param type A string with a default value of physical, but a value of magical would change
   * the stats tested
   */
  public attack(
    self: Character | NPC,
    target: Character | NPC,
    type: string = 'physical'
  ): void {
    let attack: number = Math.random() * 100;
    if (attack >= 100 - self.dexterity) {
      this.messageService.add(
        `${target.name} has been hit critically for ${
          self.damageValue * 2
        } damage!`,
        true
      );
      this.dealDamage(target, self.damageValue * 2);
    } else if (attack + self.attackValue > target.evadePercentage) {
      var totalDamage =
        self.damageValue -
        target.armorValue +
        Math.floor(Math.random() * self.damageValue * 0.1);

      if (totalDamage < 1) {
        totalDamage = 1;
      }
      this.dealDamage(target, totalDamage);
      this.messageService.add(
        `${target.name} has been hit for ${totalDamage} damage!`,
        true
      );
    } else {
      this.messageService.add(`${self.name} missed ${target.name}`, true);
    }
  }

  /**
   * Deals damage to the char equal to the damage passed in.
   * @param char The player or non player character that is recieving damage
   * @param damage The amount of damage recieved
   */
  public dealDamage(char: Character | NPC, damage: number): void {
    if (damage > 0) {
      char.currentHP -= damage;
    }
  }

  /**
   * an ability used to try to escape combat.
   * @param self the player or non player character using the ability
   * @param target The enemy whose speed is being compared
   * @returns A boolean. true = self is faster and will leave combat. false = the enemy is faster and self cannot escape
   */
  public flee(self: Character | NPC, target: Character | NPC): void {
    if (self.dexterity > target.dexterity) {
      this.messageService.add(`${self.name} has fled!`, true);
      self.fleeingRounds = 0;
      self.fleeing = true;
    } else if (self.dexterity < target.dexterity && self.fleeingRounds > 0) {
      this.messageService.add(`${self.name} has fled!`, true);
      self.fleeingRounds = 0;
      self.fleeing = true;
    } else {
      self.fleeingRounds += 1;
      this.messageService.add(`${self.name} tried to flee!`, true);
    }
  }
  /**
   * Heals the character by the amount passed in.
   * @param self the pc or npc to be healed
   * @param amountHealed The amount of hp regained
   */
  public heal(self: Character | NPC, amountHealed: number): void {
    self.currentHP += amountHealed;
    this.messageService.add(
      `${self.name} has been healed for ${amountHealed}!`,
      true
    );
    if (self.currentHP > self.maxHP) {
      self.currentHP = self.maxHP;
    }
  }

  /**
   * Used at the end of a round, it ensures both combatants are able to continue fighting, and if not returns false and ends combat.
   *
   * @returns false if combat cannot continue, else true
   */
  public checkCombatants(): boolean {
    if (this.playerCharacter.fleeing == true) {
      return false;
    }
    this.checkEffectsDuration(this.NPCEnemy);
    this.checkEffectsDuration(this.playerCharacter);
    this.messageService.add("checking combatants")
    if (this.playerCharacter.currentHP <= 0) {
      this.playerCharacter.currentHP = 0;
      this.messageService.add('You can no longer fight.', true);

      // Send back to town
      return false;
    } else if (this.NPCEnemy.currentHP <= 0) {
      this.NPCEnemy.currentHP = 0;
      this.messageService.add(
        `You defeated the ${this.NPCEnemy.name}! You scavenge ${this.NPCEnemy.currentCurrency} Essence.`,
        true
      );
      this.gainLoot(this.playerCharacter, this.NPCEnemy);

      return false;
    } else {
      return true;
    }
  }
  /**
   * Verifies that all parties have enough HP to attack or be attacked.
   *
   * @returns true if attack can be made, else false
   */
  public healthCheck(): boolean {
    if (this.NPCEnemy.currentHP > 0 && this.playerCharacter.currentHP > 0) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * A combat round. Uses the two combatants' dexterity to determine order then makes the enemy attack the player and
   * performs whatever action dictated by the actionCall string the player submitted
   * @param character
   * @param enemy
   * @param actionCall
   */
  public round(ability: Ability): boolean {
    if (this.roundOrder == null) {
      if (this.playerCharacter.dexterity >= this.NPCEnemy.dexterity) {
        this.roundOrder = [this.playerCharacter, this.NPCEnemy];
      } else {
        this.roundOrder = [this.NPCEnemy, this.playerCharacter];
      }
    }

    for (let i = 0; i < this.roundOrder.length; i++) {
      if (this.healthCheck()) {
        var enemy!: Character | NPC;
        if (this.roundOrder[i] == this.NPCEnemy) {
          enemy = this.playerCharacter;
          this.useAbility(
            this.roundOrder[i],
            enemy,
            this.roundOrder[i].abilities[0]
          );
          // this.messageService.add(`actor:${this.roundOrder[i].name}target:${enemy.name}ability:${this.roundOrder[i].abilities[0].name}`)
        } else {
          enemy = this.NPCEnemy;
          this.useAbility(this.roundOrder[i], enemy, ability);
        }
      }
    }
    return this.checkCombatants();
  }

  public useAbility(
    self: Character | NPC,
    enemy: Character | NPC,
    ability: Ability
  ): void {
    // this.messageService.add(`${ability.effect} ${ability.name}`)
    if (ability.effect != 'damage' && ability.effect != 'debuff') {
      // this.messageService.add("healing")
      this.performAbility(self, self, ability);
    } else {
      this.performAbility(self, enemy, ability);
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
   *
   * I need to continue to split this up into more smaller functions. That will allow for easier c
   * ustom logic based on what ability is being used and a more readable and scalable function overall
   * @param self The PC or NPC using the ability
   * @param target The target of the abiity
   * @param effect A string: options "damage", "heal", "buff", and "debuff"?
   * @param affectedAttribute A string that maps to a particular attribute on the character object
   * @param modifier Def=1 - A number that increases the effect of the ability
   * @param duration Def=0 - number indicating the number of rounds the effect persists
   * @param type Def="physical" - A string: "physical" and "magical" indicating which attribute should be
   * used for damage (strength vs intelligence) against which defense (armor vs resistance)
   */
  public performAbility(
    self: Character | NPC,
    target: Character | NPC,
    ability: Ability
  ) {
    // this.messageService.add(`starting ability. Effect: ${ability.effect}`)
    this.messageService.add(
      `${self.name} ${ability.description} ${target.name}`,
      true
    );

    if (ability.effect == 'damage') {
      if (ability.type == 'physical') {
        self.damageValue = self.damageValue * ability.modifier;
        this.attack(self, target);
        self.resetDamageValue();
      } else if (ability.type == 'magical') {
        // attack but using magic against resistance
      }
      if (ability.affectedAttribute) {
        this.debuff(target, ability.affectedAttribute, ability.duration);
      }
    } else if (ability.effect == 'heal') {
      this.heal(target, self.magicValue * ability.modifier);
    }

    if (ability.effect == 'flee') {
      this.flee(this.playerCharacter, this.NPCEnemy);
    }
    if (ability.effect == 'buff') {
      switch (ability.affectedAttribute) {
        case 'stoneArmored': {
          self.armorValue =
            self.armor + Math.floor(self.magicValue) * ability.modifier;
          self.stoneArmored = true;
          self.stoneArmoredRounds = ability.duration;
          break;
        }
        case 'stoneFists': {
          self.damageValue = Math.floor(self.magicValue) * ability.modifier; // add a weapon modifier to this
          self.stoneFists = true;
          break;
        }
      }
      if (ability.affectedAttribute == 'strengthened') {
        if (ability.modifier == 0) {
          self.resetDamageValue(2);
        } else {
          self.damageValue = Math.floor(self.strength / 2) * ability.modifier;
          // this.messageService.add(`adding damage`)
        }
        self.strengthened = true;
        self.strengthenedRounds = ability.duration > 2 ? ability.duration : 2;
      } else if (ability.affectedAttribute == 'resistValue') {
        if (ability.modifier == 0) {
          self.resistValue = self.resistance + 2;
        } else {
          self.resistValue = self.resistance * ability.modifier;
        }
      } else if (ability.affectedAttribute == 'defending') {
        // this.messageService.add(`${ability.affectedAttribute}`)
        if (ability.modifier == 0) {
          self.armorValue = self.armor + 2;
        } else {
          self.armorValue = self.armor * ability.modifier;
        }
        self.defended = true;
        self.defendingRounds = ability.duration > 2 ? ability.duration : 2;
      } else if (ability.affectedAttribute == 'evading') {
        // this.messageService.add(`${ability.affectedAttribute}`)
        if (ability.modifier == 0) {
          // this.messageService.add('modifer is 0, boosting by 4')
          self.evadePercentage = Math.floor(self.dexterity) + 4;
        } else {
          // this.messageService.add('modifer is not 0, boosting by other')
          self.evadePercentage = Math.floor(self.dexterity) * ability.modifier;
        }
        self.evading = true;
        self.evadingRounds = ability.duration > 2 ? ability.duration : 2;
      } else if (ability.affectedAttribute == 'focusing') {
        // this.messageService.add(`${ability.affectedAttribute}`)
        if (ability.modifier == 0) {
          self.attackValue = self.intelligence + 2;
        } else {
          self.attackValue = self.intelligence * ability.modifier;
        }
        self.focusing = true;
        self.focusingRounds = ability.duration > 2 ? ability.duration : 2;
      } else if (ability.affectedAttribute == 'magicValue') {
        if (ability.modifier == 0) {
          self.magicValue = Math.floor(self.intelligence / 2) + 2;
        } else {
          self.magicValue =
            Math.floor(self.intelligence / 2) * ability.modifier;
        }
      }
    }
  }

  public debuff(
    target: Character | NPC,
    affectedAttribute: string,
    duration: number
  ) {
    switch (affectedAttribute) {
      case 'poisoned': {
        target.poisoned = true;
        target.poisonedRounds = duration;
        break;
      }
      case 'slowed': {
        target.slowed = true;
        target.slowedRounds = duration;
        break;
      }
      case 'vulnerable': {
        target.vulnerable = true;
        target.vulnerableRounds = duration;
        break;
      }
      case 'hitByWind': {
        target.hitByWind = true;
        break;
      }
      case 'stunned': {
        target.stunned = true;
        break;
      }
      case 'burning': {
        target.burning = true;
        target.burningRounds = duration;
        break;
      }
    }
  }
  /**
   * split into separate functions and collect them?
   */
  public checkEffectsDuration(self: Character | NPC): void {
    // create hashmap of boolean (defended) and rounds (defendedRounds) and then iterate over them? or create an array of booleans and an array of
    self.buildStatusArrays();
    for (let i = 0; i < self.positiveRoundCounterArray!.length; i++) {
      if (self.positiveStatusArray![i] == true) {
        this.messageService.add(`${self.name} ${self.positiveStatusArray![i]}`)
        this.messageService.add(`${self.name} ${self.positiveRoundCounterArray![i]}`)
        this.messageService.add(`${self.name} ${self.positiveResetArray![i]}`)
        if (self.positiveRoundCounterArray![i] == 0) {
          self.positiveResetArray![i]();
        }
        else {
          self.positiveRoundCounterArray![i]--;
          this.messageService.add(`${self.name} ${self.positiveRoundCounterArray![i]}`)
        }
      }
    }

    for (let i = 0; i < self.negativeRoundCounterArray!.length; i++) {
      if (self.negativeStatusArray![i] == true) {
        self.negativeStatusInflictArray![i]();
        if (self.negativeRoundCounterArray![i] == 0) {
          self.negativeResetArray![i]();
        }
      }
    }
  }
}
