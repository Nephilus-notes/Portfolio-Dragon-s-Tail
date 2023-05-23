import { Item } from "./item";
import { Equipment } from "./equipment";
import { Ability } from "./ability";

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
    
      //  STATUSES //
      // # Status flags
        burning: boolean = false;
        burningBlades : boolean = false;
        defended : boolean = false;
        doubleArmed : boolean = false;
        evading : boolean = false;
        fleeing: boolean = false;
        focusing: boolean = false;
        poisoned : boolean = false;
        slowed : boolean = false;
        stoneArmored : boolean = false;
        strengthened : boolean = false;
        vulnerable : boolean = false;
        
        // no incrementers
        hitByWind : boolean = false;
        stunned: boolean = false;
        stoneFists : boolean = false;
    
        // status Incrementors
        burningRounds: number = 0;
        burningBladesRounds : number = 0;
        defendingRounds: number = 0;
        doubleArmedRounds : number = 0;
        evadingRounds: number = 0;
        fleeingRounds : number = 0;
        focusingRounds: number = 0;
        poisonedRounds : number = 0;
        slowedRounds : number = 0;
        stoneArmoredRounds: number = 0;
        strengthenedRounds: number = 0;
        vulnerableRounds: number = 0;

        negativeStatusArray?: Array<boolean>;
        negativeRoundCounterArray?: Array<number>;
        negativeResetArray?: Array<Function>;
        negativeStatusInflictArray?: Array<Function>;
        
        positiveStatusArray?: Array<boolean>;
        positiveRoundCounterArray?: Array<number>;
        positiveResetArray?: Array<Function>;
       


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
            this.attackValue = Math.floor(this.intelligence / 2);
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

        public resetBurningBlades(): void {
            this.burningBlades = false;
            this.burningBladesRounds = 0;
            this.resetDamageValue();    
        }
        
        public resetDefended(): void {
            this.defended = false;
            this.defendingRounds = 0;
            this.resetArmorValue();
        }

        public resetDoubleArmed(): void {
            this.doubleArmed = false;
            this.doubleArmedRounds = 0;
            this.resetDamageValue();
        }   

        public resetEvading(): void {
            this.evading = false;
            this.evadingRounds = 0;
            this.resetEvadePercentage();
        }   

        public resetFleeing(): void {   
            this.fleeing = false;
            this.fleeingRounds = 0;
        }   

        public resetFocusing(): void {
            this.focusing = false;
            this.focusingRounds = 0;
            this.resetAttackValue();
        }   

        public resetStoneArmored(): void {
            this.stoneArmored = false;
            this.stoneArmoredRounds = 0;
            this.resetArmorValue();
        }   

        public resetStrengthened(): void {   
            this.strengthened = false;
            this.strengthenedRounds = 0;
        }   

        public resetVulnerable(): void {
            this.vulnerable = false;
            this.vulnerableRounds = 0;
        }

        public resetBurning(): void {
            this.burning = false;
            this.burningRounds = 0;
        }
        
        public resetPoisoned(): void {
            this.poisoned = false;
            this.poisonedRounds = 0;
        }

        public resetSlowed(): void {
            this.slowed = false;
            this.slowedRounds = 0;
        }

        public takePoisondamage(): void {
            this.currentHP -= Math.floor(this.maxHP / 10);
        }

        public takeBurningdamage(): void {
            this.currentHP -= Math.floor(this.maxHP / 10);
        }

        public slowfurther(): void {
            this.evadePercentage -= 5;
        }

        public takeVulnerable(): void {
            
        }

        public buildNegativeStatusArray(): void {
            this.negativeStatusArray = [
            this.burning,
            this.poisoned,
            this.slowed,
            this.vulnerable];
        }
        public buildNegativeRoundCounterArray(): void {
            this.negativeRoundCounterArray = [
            this.burningRounds,
            this.poisonedRounds,
            this.slowedRounds,
            this.vulnerableRounds];
        }

        public buildNegativeResetArray(): void {
            this.negativeResetArray = [
            this.resetBurning,
            this.resetPoisoned,
            this.resetSlowed,
            this.resetVulnerable];
        }
        public buildNegativeStatusInflictArray(): void {
            this.negativeStatusInflictArray = [
            this.takeBurningdamage,
            this.takePoisondamage,
            this.slowfurther]
        };
        
        buildPositiveStatusArray(): void {
            this.positiveStatusArray = [this.burningBlades,
            this.defended,
            this.doubleArmed,
            this.evading,
            this.fleeing,
            this.focusing,
            this.stoneArmored,
            this.strengthened,];
}
 public buildPositiveRoundCounterArray(): void {    
    this.positiveRoundCounterArray = [this.burningBladesRounds,
    this.defendingRounds,
    this.doubleArmedRounds,
    this.evadingRounds,
    this.fleeingRounds,
    this.focusingRounds,
    this.stoneArmoredRounds,
    this.strengthenedRounds,];
}
 public buildPositiveResetArray(): void {
    this.positiveResetArray = [this.resetBurningBlades,
    this.resetDefended,
    this.resetDoubleArmed,
    this.resetEvading,
    this.resetFleeing,
    this.resetFocusing,
    this.resetStoneArmored,
    this.resetStrengthened,];
}

public buildStatusArrays(): void {
    this.buildNegativeStatusArray();
    this.buildNegativeRoundCounterArray();
    this.buildNegativeResetArray();
    this.buildPositiveStatusArray();
    this.buildPositiveRoundCounterArray();
    this.buildPositiveResetArray();
    this.buildNegativeStatusInflictArray();
};

}