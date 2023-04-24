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
  @Input() shopBool!: boolean;
  @Input() character!: Character;
  building?: string;
  display?: string;
  selectedItem?: Item;

  items: Array<Item> = [];

  ngOnChanges(): void {
    if (this.shopBool) {
      this.building = this.location.id
    }
    switch (this.building) {

      case "A" : {
        this.display = "healing potions!";
        this.getItems([8,9,11])
        // this.items = [
        //   {
        //     id:8, 
        //     name : "Minor Health Potion",
        //     itemStat : 2,
        //     price : 10,
        //     slot : "consumable",
        //     description : "A small red potion that smells of cinnamon and nutmeg. It heals a small amount of health."
        // },

        // {
        //   id:9,
        //     name : "Health Potion",
        //     itemStat : 5,
        //     price : 200,
        //     slot : "consumable",
        //     description : "A small orange potion that smells of mint and orange.  It heals some health."
        // },
        // {
        //   id:11,
        //     name : "Major Health Potion",
        //     itemStat : 8,
        //     price : 40,
        //     slot : "consumable",
        //     description : "A small yellow potion that smells of lemon and fresh air. It heals a substantial amount of health."
        // }
        // ]
        console.warn(this.display)
        break;
      }
      case "B" : {
        this.display = "arms and armor";
        this.getItems([5,10,1,2,4,6,7])
        // this.items = [
        
        //   {
        //     id : 5,
        //       name : "Chainmail Armor",
        //       itemStat : 3,
        //       price : 60,
        //       slot : "body",
        //       description : "A jacket made of steel rings.  It provides great protection without limiting your movement."
        //   },
        //   {
        //     id:10,
        //       name : "Dagger",
        //       itemStat : 1,
        //       price : 10,
        //       slot : "hand",
        //       description : "A simple dagger with a leatherwrapped bone hilt. It's good for cutting things and taking on large rodents."
        //   },
        //   {
        //     id:1,
        //       name : "Sword",
        //       itemStat : 3,
        //       price : 50,
        //       slot : "hand",
        //       description : "A well-made shortsword that can be used to fight against any foe."
        //   },
        //   {
        //     id:2,
        //       name : "Axe",
        //       itemStat : 4,
        //       price : 90,
        //       slot : "hand",
        //       description : "A polished axe that can easily take chunks out of full grown trees."
        //   },
        //   {
        //     id: 4,
        //       name : "Leather Armor",
        //       itemStat : 1,
        //       price : 20,
        //       slot : "body",
        //       description : "A jacket made of toughened leather, it provides some protection against the elements and enemies alike."
        //   },

        //   {id: 6,
        //       name : "Brigandine",
        //       itemStat : 4,
        //       price : 100,
        //       slot : "body",
        //       description : "Plates of steel bolted onto a leather and chain tunic, this armor gives almost unparellelled protection" +
        //       " without sacrificing mobility or size."
              
        //   },
        //   {
        //     id:7,
        //       name : "Bone Mail",
        //       itemStat : 6,
        //       price : 150,
        //       slot : "body",
        //       description : "Someone's prized posession, this armor is made of the the bones of their ancestors. " +
        //       "The black bones are stronger than steel and you can almost feel a protective aura when you put it on."
        //     }
        // ]
        console.warn(`These items : ${this.items}`)
        console.warn(this.display)
        break
      }
    }
  }

  ngOnInit(): void {
    this.building = this.location.id
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
