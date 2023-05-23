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
        this.magicValue = this.intelligence;
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

        public resetArmorValue(): void {
            this.armorValue = this.armor; // make a conditional to use the itemstat of equipped armor
        }

        public resetDamageValue(): void {
            this.damageValue = Math.floor(this.equippedItems?.hand?.itemStat ? 
            this.equippedItems.hand.itemStat + (this.strength / 2) : this.strength / 2);
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

        public resetStatusBoolean(attribute:boolean): void {

        }
        
}
