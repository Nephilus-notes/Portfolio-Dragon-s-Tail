import { Component } from '@angular/core';
import { Location } from '../location'
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { LOCATIONS } from '../locations';
import { LocationService } from '../location.service';

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
  // characterView: boolean = false
  // characterViewSwitch(): void {
  //   if (characterView) {
  //     characterView = false
  //   } else {
  //     characterView = true
  //   }
  // }

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
  public formData($event: any): void {
    this.messageService.add(`event: ${$event}`)
    this.location = this.locationService.getNewLocation($event.toUpperCase())
  }

  changeLocation(submitString:string): void {
    // this.messageService.add(`${submitString} trying for new location`)
    this.location = this.locationService.getNewLocation(submitString)
  }

  getNPC(): void {
    this.characterService.getEnemy()
          .subscribe(enemy => this.enemy = enemy)
  }



ngOnInit(): void {

    this.getCharacter();
    this.changeLocation("T");
    this.getNPC();
  // }
}
  title = "Dragon's Tail";
}
  
  // CharacterViewButton?.addEventListener(('click'), () => {
  //   console.log('clicked')
  //   characterView = false ? characterView : true
  // })

