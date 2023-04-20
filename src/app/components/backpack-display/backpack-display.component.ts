import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../models/character';
import { Item } from '../../models/item'
import { CharacterService } from '../../services/character.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-backpack-display',
  templateUrl: './backpack-display.component.html',
  styleUrls: ['./backpack-display.component.css']
})
export class BackpackDisplayComponent {
  @Input() character!: Character;

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
        case "Hand": {
          this.selectedItemUse = "Damage";
          this.useItem = "Equip";
          break;
        }
        case "Body": {
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
        if (this.character.currentHP < this.character.maxHP) {
          this.character.currentHP += selectedItem.itemStat;
          if (this.character.currentHP > this.character.maxHP) {
            this.character.currentHP = this.character.maxHP;
            this.messageService.add("potion used")
            this.character.bag.splice(this.backpacklocation, 1);
            // this.saveCharacter();
          }
        }
        break;
      }
      case "Equip": {
        switch(selectedItem.slot) {

          case 'Hand': {
            var temp_item!: Item

            if (this.character.equippedItems.Hand) 
            {
              temp_item = this.character.equippedItems.Hand
            }

            this.character.equippedItems.Hand = selectedItem

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
          case "Body": {
            var temp_item!: Item

            if (this.character.equippedItems.Body) 
            {
              temp_item = this.character.equippedItems.Body
            }

            this.character.equippedItems.Body = selectedItem

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
          case "Head": {
            var temp_item!: Item

            if (this.character.equippedItems.Head) 
            {
              temp_item = this.character.equippedItems.Head
            }

            this.character.equippedItems.Head = selectedItem

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
    // this.saveCharacter();
    this.selectedItem = undefined;
    this.backpacklocation = 0;
  }

  constructor(private messageService: MessageService) {}


}