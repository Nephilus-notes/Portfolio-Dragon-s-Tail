import { Item } from "./item";
import { Equipment } from "./equipment";

export class Char {
    constructor(
        name: string,
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        abilities: string[]
      ) {
        this.name = name;
        this.strength = strength;
        this.dexterity = dexterity;
        this.intelligence = intelligence;
        this.constitution = constitution;
        this.abilities = abilities;
        this.maxHP = 2 * this.constitution;
        this.maxMP = 2 * this.intelligence;
        this.currentHP = this.maxHP;
        this.currentMP = this.maxMP;
        this.armorValue = this.armor;
        this.damageValue = this.strength / 2;
        this.evadePercentage = this.dexterity; // Times 2 for maxed evasion at 50?
        this.resistValue = this.resistance;
        this.attackValue = this.intelligence;
      }
      id?: number = undefined; // fix hard coded thing
      name: string;
      level: number = 1;
      currentCurrency: number = 0;
      //   currentLocation!: string;
      //   lifeTimeCurrency: number = 0;
    //   strengthXP: number = 0;
        // dexterityXP: number = 0;
        // constitutionXP: number = 0;
        // intelligenceXP: number = 0;
    //   items: Array<Item> = [];
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

    
      abilities: Array<string>;
      currentHP: number;
      currentMP: number;
    
      armorValue: number;
      attackValue: number;
      damageValue: number;
      evadePercentage: number;
      resistValue: number;
    
      //  STATUSES //
      // # Status flags
      defended : boolean = false;
        evading : boolean = false;
        fleeing: boolean = false;
        stoneArmored : boolean = false;
        slowed : boolean = false;
        vulnerable : boolean = false;
        doubleArmed : boolean = false;
        burningBlades : boolean = false;
        stoneFists : boolean = false;
        focusing: boolean = false;
    
        // no incrementers
        poisoned : boolean = false;
        burning: boolean = false;
        hitByWind : boolean = false;
        stunned: boolean = false;
    
        // status Incrementors
        evadingRounds: number = 0;
        defendingRounds: number = 0;
        fleeingRounds : number = 0;
        focusingRounds: number = 0;
        slowedRounds : number = 0;
        stoneArmoredRounds: number = 0;
        vulnerableRounds: number = 0;
        doubleArmedRounds : number = 0;
        burningBladesRounds : number = 0;
        burningRounds: number = 0;
        poisonedRounds : number = 0;

        public resetArmorValue(): void {
            this.armorValue = this.armor; // make a conditional to use the itemstat of equipped armor
        }

        public resetDamageValue(): void {
            this.damageValue = this.equippedItems?.hand?.itemStat ? 
            this.equippedItems.hand.itemStat + (this.strength / 2) : this.strength / 2;
        }

        public resetEvadePercentage(): void {
            this.evadePercentage = this.dexterity;
        }

        public resetResistValue(): void {
            this.resistValue = this.resistance;
        }

        public resetAttackValue(): void {
            this.attackValue = this.intelligence;
        }
}
