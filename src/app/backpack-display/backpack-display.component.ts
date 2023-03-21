import { Component } from '@angular/core';
import { Character } from '../character';
import { Item } from '../item'
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-backpack-display',
  templateUrl: './backpack-display.component.html',
  styleUrls: ['./backpack-display.component.css']
})
export class BackpackDisplayComponent {
  selectedItem?: Item;
  selectedItemUse!: string;
  useItem!: string;
  backpacklocation!: number;
  /**
   * On click event from the browser: 
   * SelectedItem is assigned to the item parameter, 
   * and the item parameter will also generate the selectedItemUse and useItem state
   * variables based off of the slot property of the item.  Backpack location is 
   * generated using i parameter to enable array access for using the item later.
   * 
   * Also used to unassign selectedItem
   * 
   * 
   * @param item - The Item object clicked in the browser 
   * @param i - The location in the backpack array of the item
   */
  onSelect(item:Item, i:number): void {
    if (this.selectedItem === item) {
      this.selectedItem = undefined;
      this.messageService.add('item deselected')
    } else {
      this.selectedItem = item;
      this.backpacklocation = i;
      this.messageService.add('item selected')
      switch(this.selectedItem.slot) {
        case "hand": {
          this.selectedItemUse = "Damage";
          this.useItem = "Equip";
          break;
        }
        case "body": {
          this.selectedItemUse = "Armor";
          this.useItem = "Equip";
          break;
        }
        default: {
          this.selectedItemUse = "Healing";
          this.useItem = "Use";
          break;
        }
      }
    }
  }
  /**
   * Uses the first parameter to determine whether to equip the second parameter 
   * or use it up to increase character's hp.
   * 
   * 
   * @param useItem - String that will determine what to do with the selectedItem: 
   * Equip for equippable items and healing for all others
   * @param selectedItem - Object of type Item that will be used if conditions allow
   */
  onItemUse(useItem: string, selectedItem: Item) {
    switch(useItem) {
      case "Use": {
        if (this.character.current_hp < this.character.hp) {
          this.character.current_hp += selectedItem.itemStat;
          if (this.character.current_hp > this.character.hp) {
            this.character.current_hp = this.character.hp;
            this.messageService.add("potion used")
            this.character.bag.splice(this.backpacklocation, 1);
            // this.saveCharacter();
          }
        }
        break;
      }
      case "Equip": {
        switch(selectedItem.slot) {

          case 'hand': {
            var temp_item!: Item

            if (this.character.equippedItems.hand) 
            {
              temp_item = this.character.equippedItems.hand
            }

            this.character.equippedItems.hand = selectedItem

            if (temp_item) 
            {
            this.character.bag[this.backpacklocation] = temp_item;
          } 
          else 
          {
            this.character.bag.splice(this.backpacklocation, 1);
          }
          break;
          }
          case "body": {
            var temp_item!: Item

            if (this.character.equippedItems.body) 
            {
              temp_item = this.character.equippedItems.body
            }

            this.character.equippedItems.body = selectedItem

            if (temp_item) 
            {
            this.character.bag[this.backpacklocation] = temp_item;
          } 
          else 
          {
            this.character.bag.splice(this.backpacklocation, 1);
          }
          break;
          }
          case "head": {
            var temp_item!: Item

            if (this.character.equippedItems.head) 
            {
              temp_item = this.character.equippedItems.head
            }

            this.character.equippedItems.head = selectedItem

            if (temp_item) 
            {
            this.character.bag[this.backpacklocation] = temp_item;
          } 
          else 
          {
            this.character.bag.splice(this.backpacklocation, 1);
          }
          break;
          }
        }
        break;
      }
      default: {
        this.messageService.add(`${this.useItem}`)
        this.messageService.add("item used unsuccessfully")
      }
    }
    this.saveCharacter();
    this.selectedItem = undefined;
    this.backpacklocation = 0;
  }

  character!: Character;
  constructor(private characterService: CharacterService, private messageService: MessageService) {}

  getCharacter(): void {
    this.characterService.getCharacter()
          .subscribe(character => this.character = character)
  }

  loadCharacter(): Character {
    this.character = this.characterService.loadCharacter()
    return this.character
    // this.messageService.add(`{ this.character }`)
  }
  saveCharacter(): void {
    this.characterService.saveCharacter(this.character)
  }
ngOnInit(): void {
    // this.getCharacter();
    this.character = this.loadCharacter();
}
}
