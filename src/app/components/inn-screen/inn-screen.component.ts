import { Component, Input, OnInit,  } from '@angular/core';

import { Location } from 'src/app/models/location';
import { Item } from 'src/app/models/item';
import { Character } from 'src/app/models/character';

import { ItemService } from 'src/app/services/item.service';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-inn-screen',
  templateUrl: './inn-screen.component.html',
  styleUrls: ['./inn-screen.component.css']
})
export class InnScreenComponent {
  @Input() location!: Location;
  @Input() GameStateSwitch!: number;
  @Input() character!: Character;
  buildingID?: string;
  display?: string;
  save:string = "Save";
  level:string = "Level Stats";
  learn:string = "Learn Abilities";
  back: string = "Back";
  levelBool:boolean = false;
  learnBool: boolean = false;

  ngOnChanges(): void {
    if (this.GameStateSwitch == 2) {
      this.buildingID = this.location.id
    }
    switch (this.buildingID) {

      case "A" : {
        this.display = "healing potions!";
      
        break;
      }
      case "B" : {
        this.display = "arms and armor";

        console.warn(this.display)
        break
      }
      case "I" : {
        this.display = "A nice glimpse into clan life"
      }
    }
    if (this.GameStateSwitch == 3) {

    }
  }

  ngOnInit(): void {
    this.buildingID = this.location.id
  };

  levelClick(): void {
    this.levelBool = true;
    console.warn(this.GameStateSwitch)
  }

  learnClick(): void {
    this.learnBool = true;
    console.warn(this.GameStateSwitch)
  }

  backClick(): void {
    if (this.levelBool || this.learnBool) {
      this.levelBool = false;
      this.learnBool = false;
    } else {
      this.GameStateSwitch = 0
    }
  }

}