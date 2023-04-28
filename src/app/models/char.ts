import { Item } from "./item";
import { Equipment } from "./equipment";

export interface Char {
    name: string;
    // lifetime_currency: number;
    // currency: number;
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

    abilities: Array <any>
    currentHP: number
    currentMP: number  
    armorValue: number;
    attackValue: number;
    damageValue: number;
    evadePercentage: number;
    resistValue: number;


}
