import { Component, Input, OnInit,  } from '@angular/core';

import { Location } from 'src/app/models/location';
import { Item } from 'src/app/models/item';

import { ItemService } from 'src/app/services/item.service';
import { MessageService } from 'src/app/services/message.service';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-shop-display',
  templateUrl: './shop-display.component.html',
  styleUrls: ['./shop-display.component.css']
})
export class ShopDisplayComponent {
  @Input() location!: Location;
  @Input() GameStateSwitch!: number;
  @Input() character!: Character;
  buildingID?: string;
  display?: string;
  selectedItem?: Item;

  items: Array<Item> = [];

  ngOnChanges(): void {
    if (this.GameStateSwitch >= 1) {
      this.buildingID = this.location.id
    }
    switch (this.buildingID) {

      case "A" : {
        this.display = "healing potions!";
        this.getItems([8,9,11])
      
        break;
      }
      case "B" : {
        this.display = "arms and armor";
        this.getItems([5,10,1,2,4,6,7])

        console.warn(`These items : ${this.items}`)
        console.warn(this.display)
        break
      }
      case "I" : {
        this.display = "wrong screen"
      }
    }
  }

  ngOnInit(): void {
    this.buildingID = this.location.id
  };


  private getItems(idList: Array<number>): void {

    for(let i = 0; i < idList.length; i ++) {

      let item = this.itemService.getItem(idList[i]).subscribe(item => 
      {
        this.items[i] = item
      });
      
      this.messageService.add(`${item}`);
    }
  }

  public onSelect(item: Item): void {
    if (this.selectedItem == item) {
      this.selectedItem = undefined;
    } else {
      this.selectedItem = item;
    }
  }

  public buyItem(): void {
    this.character.currentCurrency -= this.selectedItem!.price;
    // this.character.items = [];
    this.character.items.push(this.selectedItem!);
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === this.selectedItem!.id) {
        this.items.splice(i,1);
        this.resetSelectedItem();
        console.warn(this.items)
        return;
      }
    }
  };

  public resetSelectedItem(): void {
    this.selectedItem = undefined;
  };

  constructor(private itemService:ItemService, private messageService: MessageService) {};
 
}
