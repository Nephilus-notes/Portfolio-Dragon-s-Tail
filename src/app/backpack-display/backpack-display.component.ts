import { Component } from '@angular/core';
import { LOCATIONS } from '../locations';
import { Location } from '../location';
import { Character } from '../character';
import { Item } from '../item'

@Component({
  selector: 'app-backpack-display',
  templateUrl: './backpack-display.component.html',
  styleUrls: ['./backpack-display.component.css']
})
export class BackpackDisplayComponent {

  character: Character = {
    name: "Craelios",
    bag: [
      {id: 1,
        'name': "Death's Scythe", 
    itemStat: 15, price: 500, slot: "hand",
    description: 
  `Magical scythe 
  Whenever you touch this 
  weapon you can hear faint 
  whispers all around you.`}, 
      {id: 2,
        name: 'Minor Health Potion',
      itemStat: 2, price: 10, slot: 'consumable', 
      description:
  `Red potion 
  Smells of cinnamon and 
  nutmeg. Heals a little.`}
  ],
    equippedItems: {
      head: null,
      'body':{id:3,
    'name': 'Leather Armor',
    'itemStat': 1, 'price': 20, "slot": "body",
    'description': 
  `Toughened leather 
  Protects against
  both elements and enemies.`},
      'hand':null
  },
    armor: 4,
    resistance: 2,
    strength: 13,
    dexterity: 15,
    intelligence: 13,
    constitution: 16,
    hp: 32,
    max_mp: 26,
    damage: 5,
    abilities: [],
    current_hp: 32,
    current_mp: 26,
  }
  items: Array<Item> = this.character.bag

  oneItem: object =  {name: 'Minor Health Potion',
  item_stat: 2, price: 10, slot: 'consumable', 
  description:
`Red potion 
Smells of cinnamon and 
nutmeg. Heals a little.`}

  // locations = LOCATIONS
  // selectedLocation?: Location;
  // onSelect(location: Location): void {
  // this.selectedLocation = location;
// }
}
