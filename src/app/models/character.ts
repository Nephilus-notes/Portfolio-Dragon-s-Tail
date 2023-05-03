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
