import { Equipment } from "./equipment"
import { Item } from "./item"
import { CharacterObject } from "./characterClass";
import { Character } from "./character";

export class characterDTO extends CharacterObject{
    constructor(character:Character) {
        super(character.name, character.strength, character.dexterity, 
            character.intelligence, character.constitution, character.abilities)
            this.dateUpdated = new Date().toISOString()
            this.dateAdded = new Date().toISOString()
    }
    
    dateAdded?: string;
    dateUpdated?: string;


      
  }
