import { Equipment } from "./equipment"
import { Item } from "./item"

export interface characterDTO {
    lifeTimeCurrency: number;
    id?: number,
    items: Array<Item>,
    equippedItems: Equipment,
    strengthXP:number;
    dexterityXP:number;
    intelligenceXP:number;
    constitutionXP:number;
    maxHP: number;
    maxMP: number;
    currentHP: number;
    currentMP:  number;
    currentLocation: string;
    kratabsFollyExplored:number;
    drippingDeathExplored:number;
    playersRespiteExplored:number;
    tailOfTheDragonExplored:number;
    thagragsHopeExplored:number;
    webOfDepthsExplored:number;
    graithsGrottoExplored:number;
    graithQueensLairExplored:number;
    name: string;
    currentCurrency:number;
    level: number;
    armor:number;
    resistance:number;
    strength: number;
    dexterity: number;
    intelligence: number;
    constitution: number;
    armorValue:number;
    evadePercentage:number;
    damageValue: number;
    defended:boolean;
    evading:boolean;
    fleeing:boolean;
    stoneArmored:boolean;
    slowed:boolean;
    vulnerable:boolean;
    doubleArmed:boolean;
    burningBlades:boolean;
    stoneFists:boolean;
    poisoned:boolean;
    burning:boolean;
    focusing:boolean;
    hitByWind:boolean;
    stunned:boolean;
    defendingRounds:number;
    evadingRounds:number;
    fleeingRounds:number;
    slowedRounds:number;
    vulnerableRounds:number;
    stoneArmoredRounds:number;
    doubleArmedRounds:number;
    burningBladesRounds:number;
    burningRounds:number;
    poisonedRounds:number;
    focusingRounds:number;
    dateAdded: string;
    dateUpdated: string;
  }
