import { Char } from "./char";

export class NPC extends Char {
    constructor(
        name: string,
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        armor: number,
        resistance: number,
        abilities: string[],
        level: number,

      ) {

        let attributeList = [strength, dexterity, constitution, intelligence]
        for (let i = 0; i < attributeList.length; i ++) {
            let min: number = 0;
            let max: number = 3;
            if (attributeList[i] == 0) {
                min = 1;
            }
            else if (attributeList[i] == 14 || attributeList[i] == 18) {
                min = 0;
            }
            else if (attributeList[i] == 4) {
                min = 0;
                max += 1;
            }
            else if (attributeList[i] == 10) {
                min = -2;
            }
            // creating variable npc stats
            attributeList[i] += Math.floor(Math.random() * (max - min) + min);
            
        }
        super(name, attributeList[0], attributeList[1], attributeList[2], attributeList[3], abilities)
       

        this.level = level;
        this.resistance = resistance;
        this.armor = armor;
        this.currentCurrency = Math.floor(Math.random() * (5 - 1) + 1) * this.level;
      }

}