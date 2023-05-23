import { Item } from "./item";
import { Equipment } from "./equipment";
import { Ability } from "./ability";
import { StatusFlag } from "./statusFlag";

export class Char {
    constructor(
        name: string,
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        abilities: Array<Ability>
      ) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.abilities = abilities;
        this.maxHP = 2 * this.constitution;
        this.maxMP = 2 * this.intelligence;
        this.currentHP = this.maxHP;
        this.currentMP = this.maxMP;
        this.armorValue = this.armor;
        this.damageValue = Math.floor(this.strength / 2);
        this.evadePercentage = this.dexterity; // Times 2 for maxed evasion at 50?
        this.resistValue = this.resistance;
        this.attackValue = this.intelligence;
        this.magicValue = Math.floor(this.intelligence / 2);
      }
      id?: number = undefined; // fix hard coded thing
      name: string;
      level: number = 1;
      currentCurrency: number = 0;
   
      equippedItems: Equipment = {
        head: null,
        body: null,
        hand: null,
      };
    
      armor: number = 0;
      resistance: number = 0;
      strength: number;
      dexterity: number;
      intelligence: number;
      constitution: number;
      maxHP: number;
      maxMP: number;

    
      abilities: Array<Ability>;
      currentHP: number;
      currentMP: number;
    
      armorValue: number;
      attackValue: number;
      damageValue: number;
      evadePercentage: number;
      resistValue: number;
      magicValue:number;

      
      public resetArmorValue(): void {
            this.armorValue = this.armor; // make a conditional to use the itemstat of equipped armor
        }

        public resetDamageValue(boost:number = 0): void {
            this.damageValue = (Math.floor(this.equippedItems?.hand?.itemStat ? 
            this.equippedItems.hand.itemStat + (this.strength / 2) : this.strength / 2)) + boost;
        }

        public resetEvadePercentage(): void {
            this.evadePercentage = this.dexterity;
        }
        
        public resetResistValue(): void {
            this.resistValue = this.resistance;
        }

        public resetAttackValue(): void {
            this.attackValue = this.intelligence / 2;
        }

        public resetMagicValue(): void {
            this.magicValue = Math.floor(this.intelligence / 2);
        }

        public resetCombatStats(): void {
            this.resetArmorValue();
            this.resetAttackValue();
            this.resetDamageValue();
            this.resetEvadePercentage();
            this.resetResistValue();
            this.resetMagicValue();
        }

        public setDependentStats(): void {
            this.maxHP = this.constitution * 2;
            this.maxMP = this.intelligence * 2;
            this.hpToMax();
            this.mpToMax();
        }

        public hpToMax(): void {
            this.currentHP = this.maxHP;
        }

        public mpToMax(): void {
            this.currentMP = this.maxMP;
        }

        public fullHeal(): void {
            this.hpToMax();
            this.mpToMax();
        }
        
        public checkStatus(): void {

        }
        
        public resetBurningBlades = (): void => {
            this.resetDamageValue();    
            this.positiveStatusFlags["burningBlades"].active = false;
            this.positiveStatusFlags["burningBlades"].rounds = 0;
        }
        
        public resetDefending = (): void => {
            this.resetArmorValue();
            this.positiveStatusFlags["defending"].active = false;
            this.positiveStatusFlags["defending"].rounds = 0;
        }

        public resetDoubleArmed = (): void => {
            this.resetDamageValue();
            this.positiveStatusFlags["doubleArmed"].active = false;
            this.positiveStatusFlags["doubleArmed"].rounds = 0;
        }   

        public resetEvading = (): void => {
            this.resetEvadePercentage();
            this.positiveStatusFlags["evading"].active = false;
            this.positiveStatusFlags["evading"].rounds = 0;
        }   

        public resetFleeing = (): void => {   
            this.positiveStatusFlags["fleeing"].active = false;
            this.positiveStatusFlags["fleeing"].rounds = 0;
        }   

        public resetFocusing = (): void => {
            this.resetAttackValue();
            this.positiveStatusFlags["focusing"].active = false;
            this.positiveStatusFlags["focusing"].rounds = 0;
        }   

        public resetStoneArmored = (): void => {
            this.resetArmorValue();
            this.positiveStatusFlags["stoneArmored"].active = false;
            this.positiveStatusFlags["stoneArmored"].rounds = 0;
        }   

        public resetStrengthened = (): void => {   
            this.resetDamageValue();
            this.positiveStatusFlags["strengthened"].active = false;
            this.positiveStatusFlags["strengthened"].rounds = 0;
        }   

        public resetVulnerable = (): void => {
            this.positiveStatusFlags["vulnerable"].active = false;
            this.positiveStatusFlags["vulnerable"].rounds = 0;
        }

        public resetBurning = (): void => {
            this.negativeStatusFlags["burning"].active = false;
            this.negativeStatusFlags["burning"].rounds = 0;
        }
        
        public resetPoisoned = (): void => {
            this.negativeStatusFlags["poisoned"].active = false;
            this.negativeStatusFlags["poisoned"].rounds = 0;
        }

        public resetSlowed = (): void => {
            this.negativeStatusFlags["slowed"].active = false;
            this.negativeStatusFlags["slowed"].rounds = 0;
        }
        
        public takePoisonDamage = (): void => {
            this.currentHP -= Math.floor(this.maxHP / 10);
        }

        public takeBurningdamage = (): void => {
            this.currentHP -= Math.floor(this.maxHP / 10);
        }
        
        public slowfurther = (): void => {
            this.evadePercentage -= 5;
        }
        
        positiveStatusFlags: { [key: string]: StatusFlag } = {
          "burningBlades" :new StatusFlag("burningBlades", this.resetBurningBlades),
          "defending": new StatusFlag("defending", this.resetDefending),
          "doubleArmed": new StatusFlag("doubleArmed", this.resetDoubleArmed),
            "evading": new StatusFlag("evading", this.resetEvading),
            "fleeing": new StatusFlag("fleeing", this.resetFleeing),
            "focusing": new StatusFlag("focusing", this.resetFocusing),
            "stoneArmored": new StatusFlag("stoneArmored", this.resetStoneArmored),
            "stoneFists": new StatusFlag("stoneFists"),
            "strengthened": new StatusFlag("strengthened", this.resetStrengthened),
            
        };
          
          negativeStatusFlags: { [key: string]: StatusFlag } = {
              "burning" : new StatusFlag("burning", this.resetBurning, this.takeBurningdamage),
              "poisoned" : new StatusFlag("poisoned", this.resetPoisoned, this.takePoisonDamage),
              "hitByWind" : new StatusFlag("hitByWind"),
              "slowed" : new StatusFlag("slowed", this.resetSlowed, this.slowfurther),
              "stunned" : new StatusFlag("stunned"),
              "vulnerable" : new StatusFlag("vulnerable", this.resetVulnerable),
          };
    }