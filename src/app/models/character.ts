import { Equipment } from './equipment';
import { Item } from './item'
import { Char } from './char';

export class Character extends Char {
    constructor(
        name: string,
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        abilities: string[]
      ) {
        super(name, strength, dexterity, constitution, intelligence,abilities)
        // this.name = name;
        // this.strength = strength;
        // this.dexterity = dexterity;
        // this.intelligence = intelligence;
        // this.constitution = constitution;
        // this.abilities = abilities;
        // this.maxHP = 2 * this.constitution;
        // this.maxMP = 2 * this.intelligence;
        // this.currentHP = this.maxHP;
        // this.currentMP = this.maxMP;
        // this.armorValue = this.armor;
        // this.damageValue = this.strength / 2;
        // this.evadePercentage = this.dexterity; // Times 2 for maxed evasion at 50?
        // this.resistValue = this.resistance;
        // this.attackValue = this.intelligence;
      }
     
      currentLocation!: string;
      
      lifeTimeCurrency: number = 0;
      items: Array<Item> = [];
     
    
      strengthXP: number = 0;
      dexterityXP: number = 0;
      constitutionXP: number = 0;
      intelligenceXP: number = 0;
    
      kratabsFollyExplored: number = 0;
      drippingDeathExplored: number = 0;
      playersRespiteExplored: number = 0;
      tailOfTheDragonExplored: number = 0;
      thagragsHopeExplored: number = 0;
      webOfDepthsExplored: number = 0;
      graithsGrottoExplored: number = 0;
      graithQueensLairExplored: number = 0;
    
}
