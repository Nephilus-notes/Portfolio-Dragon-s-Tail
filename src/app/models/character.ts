import { Equipment } from './equipment';
import { Item } from './item'
import { Char } from './char';

export interface Character extends Char {
    name: string;
    // lifetime_currency: number;
    currentCurrency: number;
    items: Array<Item>
    equippedItems: Equipment

    armor: number 
    resistance: number
    strength: number
    dexterity: number
    intelligence: number
    constitution: number
    maxHP : number
    maxMP : number
    // weapon: object
    // weapon_damage : number
    damage : number

    abilities: Array<Array <any>>
    currentHP: number
    currentMP: number  
    kratabsFollyExplored: number
    drippingDeathExplored: number
    playersRespiteExplored: number
    tailOfTheDragonExplored: number
    thagragsHopeExplored: number
    webOfDepthsExplored: number
    graithsGrottoExplored: number
    graithQueensLairExplored: number

    // armor_val :number
    // att_val :number
    // damage_val :number
    // dodge_val :number
    // resist_val:number
    
     // STATUSES //
    // # Status flags
    // defended : boolean
    // dodging : boolean
    // fleeing: boolean
    // stone_armored : boolean
    // slowed : boolean
    // vulnerable : boolean
    // double_armed : boolean
    // burning_blades : boolean
    // stone_fists : boolean

    // no incrementers
    // poisoned : boolean
    // burning: boolean
    // wind_hit_by : boolean
    // stunned: boolean

    // // status Incrementors
    // dodging_rounds: number
    // defended_rounds: number
    // flee_count : number
    // slowed_rounds : number
    // stone_armored_rounds: number
    // vulnerable_rounds: number
    // double_armed_rounds : number
    // burning_blades_rounds : number
    // burning_rounds: number
    // poisoned_rounds : number
}
