import { Char } from "./char";

export class NPC extends Char {
    constructor(
        name: string,
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        abilities: string[]
      ) {

        let attributeList = [strength, dexterity, constitution, intelligence]
        for (let attribute of attributeList) {
            let min: number = 0;
            let max: number = 3;
            if (attribute == 0) {
                min = 1;
            }
            else if (attribute == 4 || attribute == 14 || attribute == 18) {
                min = 0;
            }
            else if (attribute == 10) {
                min = -2;
            }
            // creating variable npc stats
            attribute += Math.floor(Math.random() * (max - min) + min);
            
        }
        super(name, attributeList[0], attributeList[1], attributeList[2], attributeList[3], abilities)
       
        this.currentCurrency = Math.floor(Math.random() * (5 - 1) + 1) * this.level;
      }

}