import { Equipment } from './equipment';
import { Item } from './item'
import { Char } from './char';

export interface Character extends Char {
    id?: number;
    name: string;
    level: number;
    currentLocation: string;
    lifeTimeCurrency: number;
    currentCurrency: number;
    items: Array<Item>;
    equippedItems: Equipment;


    strengthXP: number;
    dexterityXP: number;
    constitutionXP: number;
    intelligenceXP: number;
    armor: number ;
    resistance: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    maxHP : number;
    maxMP : number;
    // weapon: object;
    // weapon_damage : number;

    abilities: Array<Array <any>>;
    currentHP: number;
    currentMP: number  ;
    kratabsFollyExplored: number;
    drippingDeathExplored: number;
    playersRespiteExplored: number;
    tailOfTheDragonExplored: number;
    thagragsHopeExplored: number;
    webOfDepthsExplored: number;
    graithsGrottoExplored: number;
    graithQueensLairExplored: number;

    armorValue: number;
  attackValue: number;
  damageValue: number;
  evadePercentage: number;
  resistValue: number;
    
     // STATUSES //
    //# Status flags
    defended : boolean;
    evading : boolean;
    fleeing: boolean;
    stoneArmored : boolean;
    slowed : boolean;
    vulnerable : boolean;
    doubleArmed : boolean;
    burningBlades : boolean;
    stoneFists : boolean;
    focusing: boolean;

    // no incrementers
    poisoned : boolean;
    burning: boolean;
    hitByWind : boolean;
    stunned: boolean;

    // status Incrementors
    evadingRounds: number;
    defendingRounds: number;
    fleeingRounds : number;
    focusingRounds: number;
    slowedRounds : number;
    stoneArmoredRounds: number;
    vulnerableRounds: number;
    doubleArmedRounds : number;
    burningBladesRounds : number;
    burningRounds: number;
    poisonedRounds : number;
}
