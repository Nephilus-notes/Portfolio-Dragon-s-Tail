import { Component, Input, OnInit,  } from '@angular/core';

import { Location } from 'src/app/models/mapLocation';
import { Item } from 'src/app/models/item';

import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-shop-display',
  templateUrl: './shop-display.component.html',
  styleUrls: ['./shop-display.component.css']
})
export class ShopDisplayComponent {
  constructor(private apiService:ApiService, private messageService: MessageService) {};
  
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
        this.getItems([9,10,11])
      
        break;
      }
      case "B" : {
        this.display = "arms and armor";
        this.getItems([1,2,3,4,5,6,7,8])

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

      let item = this.apiService.getItem(idList[i]).subscribe(item => 
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
    if (this.character.currentCurrency > this.selectedItem!.price) {
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
    }
  };

  public resetSelectedItem(): void {
    this.selectedItem = undefined;
  };

 
}
