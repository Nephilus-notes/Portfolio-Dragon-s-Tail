import { Equipment } from "./equipment"
import { Item } from "./item"
import { Character } from "./character";
import { Ability } from "./ability";

export interface characterDTO {
    
    dateAdded?: string;
    dateUpdated?: string;

    
    currentLocation: string;
      
    lifeTimeCurrency: number;
    items: Array<Item>;
   
  
    strengthXP: number;
    dexterityXP: number;
    constitutionXP: number;
    intelligenceXP: number;
  
    kratabsFollyExplored: number;
    drippingDeathExplored: number;
    playersRespiteExplored: number;
    tailOfTheDragonExplored: number;
    thagragsHopeExplored: number;
    webOfDepthsExplored: number;
    graithsGrottoExplored: number;
    graithQueensLairExplored: number;
      
    id?: number; // fix hard coded thing
      name: string;
      level: number ;
      currentCurrency: number;
      //   currentLocation!: string;
      //   lifeTimeCurrency: number;
    //   strengthXP: number;
        // dexterityXP: number;
        // constitutionXP: number;
        // intelligenceXP: number;
    //   items: Array<Item> = [];
      equippedItems: Equipment ;
    
      armor: number;
      resistance: number;
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

  }
