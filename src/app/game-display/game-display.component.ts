import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { LocationService } from '../location.service';
import { CombatControllerService } from '../combat-controller.service';

import { Location } from '../location'
import { Character } from '../character';

const CharacterViewButton = document.getElementById("characterViewButton")
let characterView = false;

const onClickCharacter = function () {
  if (characterView) {
    characterView = false
  } else {
    characterView = true
  }
  // characterView = false ? characterView : true
}


@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {

  constructor(private characterService: CharacterService, private messageService: MessageService, private locationService: LocationService) {}

  submitString!: string;
  CombatBool!:boolean;

  character!: Character;
  enemy!: Character;
  location!: Location;

  getCharacter(): void {
    this.characterService.getCharacter()
          .subscribe(character => this.character = character)
  }

  loadCharacter(): void {
    this.characterService.loadCharacter()
  }
  saveCharacter(): void {
    this.characterService.saveCharacter(this.character)
  }

  public playerChoice($event:any): void {
    if (this.CombatBool) {
      
    } else {
      this.location = this.locationService.getNewLocation($event.toUpperCase())
    }
  }

/**
 * Defunct: Currently generates the first town entrance.  Will be replaced by an api call 
 * from the load screen in future iterations. 
 * 
 * @param submitString 
 */
  changeLocation(submitString:string): void {
    // this.messageService.add(`${submitString} trying for new location`)
    this.location = this.locationService.getNewLocation(submitString)
  }

  getNPC(): void {
    this.characterService.getEnemy()
          .subscribe(enemy => this.enemy = enemy)
  }

  combatToggle(): void {
    if (this.CombatBool) {
      this.CombatBool = false;
    }
    else {
      this.CombatBool = true
    }
  }



ngOnInit(): void {

    this.getCharacter();
    this.changeLocation("T");
    this.getNPC();
    this.CombatBool=false;
  // }
}
  title = "Dragon's Tail";
}
  
  // CharacterViewButton?.addEventListener(('click'), () => {
  //   console.log('clicked')
  //   characterView = false ? characterView : true
  // })

