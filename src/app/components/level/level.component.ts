import { Component, Input,OnInit,OnChanges, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/character';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit{
@Input() character!: Character;
@Input() levelBool!: boolean;

plus:string = "+";
minus:string = "-";
Attributes!:number[];
attributeNames: string[] = ["Strength", "Dexterity", "Constitution", "Intelligence"]
saveChanges:string = "Save Changes";
back:string = "Back"
runningTotal!: number;


constructor(private messageService:MessageService) {}

incrementStat(i:number) {
  if (this.character.currentCurrency > this.statPricer(this.Attributes[i], this.character.level)) {
    this.Attributes[i] += 1;
    this.character.currentCurrency -= this.statPricer(this.Attributes[i], this.character.level);
  }
}

/**
 * Either needs to be based off of individual stats or needs level logic to be in place. or both.
 * 
 * @param currentStat The value of the stat that
 * @param currentLevel the level the character is at right now
 * 
 * Can add the / 2 back in once the leveling is in place
 */
statPricer(currentStat:number, currentLevel:number): number {
  return Math.floor(currentStat *(currentLevel **2))
}

decrementStat(i:number): void {
  switch (i) {
    case 0 : {
        if (this.Attributes[i] > this.character.strength) {
          this.Attributes[i] -= 1;
          this.character.currentCurrency += this.statPricer(this.Attributes[i], this.character.level);
        }
        break;
      }
    case 1 : {
        if (this.Attributes[i] > this.character.dexterity) {
          this.Attributes[i] -= 1;
          this.character.currentCurrency += this.statPricer(this.Attributes[i], this.character.level);
        }
        break;
      }
    case 2: {
        if (this.Attributes[i] > this.character.constitution) {
          this.Attributes[i] -= 1;
          this.character.currentCurrency += this.statPricer(this.Attributes[i], this.character.level);
        }
        break;
      }
    case 3 : {
        if (this.Attributes[i] > this.character.intelligence) {
          this.Attributes[i] -= 1;
          this.character.currentCurrency += this.statPricer(this.Attributes[i], this.character.level);
        }
        break;
      }
  }
}

saveStats(): void {
  this.character.strength = this.Attributes[0];
  this.character.dexterity = this.Attributes[1];
  this.character.constitution = this.Attributes[2];
  this.character.intelligence = this.Attributes[3];
  
  this.character.setDependentStats()
  this.character.resetCombatStats()
}


setDependentAttributes(): void {
  this.character.maxHP = this.character.constitution * 2;
  this.character.currentHP = this.character.maxHP;
  this.character.maxMP = this.character.intelligence * 2;
  this.character.currentMP = this.character.maxMP;
  this.resetCharacterAttributes();
}

private resetCharacterAttributes(): void {
  this.character.armorValue = this.character.armor;
  this.character.damageValue = this.character.equippedItems.hand?.itemStat ?
      this.character.equippedItems.hand?.itemStat + Math.floor(this.character.strength / 2) : Math.floor(this.character.strength / 2);
  this.character.evadePercentage = this.character.dexterity;
  this.character.resistValue = this.character.resistance;
  this.character.attackValue = this.character.intelligence;
}

@Output() ReturnToMainInn = new EventEmitter<boolean>();
returnToInn(): void {
  this.ReturnToMainInn.emit(true);
}

ngOnInit(): void {
this.Attributes = [this.character.strength, this.character.dexterity, this.character.constitution, this.character.intelligence]
}
}
