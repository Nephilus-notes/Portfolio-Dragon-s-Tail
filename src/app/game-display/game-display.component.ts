import { Component } from '@angular/core';
import { Location } from '../location'
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { LOCATIONS } from '../locations';

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
  submitString!: string;
  characterView: boolean = false
  characterViewSwitch(): void {
    if (characterView) {
      characterView = false
    } else {
      characterView = true
    }
  }
  location: Location = {
    id: "BS",
    name: "Blacksmith's Shop",
    enterText: `You step into a shop with black and silver shining at you from all around as arms and armor coat the walls.
    The blacksmith's face shines at you from over the counter.`,
    exitText: "You exit the shop",
    options: [ "T", "I"],
    enemies: []
  }
  character!: Character;
  constructor(private characterService: CharacterService, private messageService: MessageService) {}

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
onSubmit(submitString: string): void {
  this.messageService.add(`input submitted ${submitString}`)
  for (let option of this.location.options){
    // if (submitString === option) {
    //   this.location = LOCATIONS[6]
    //   this.messageService.add('moved to 6')
    // }
  }
  if (this.location.options.includes(submitString.toUpperCase())) {
    this.location = LOCATIONS[5]
    this.messageService.add("location changed")
    this.messageService.add(`${LOCATIONS[5].enterText}`)

  }
}

ngOnInit(): void {
  // if (this.characterService.exists()) {
  // } else {
    // this.loadCharacter()
    this.getCharacter();
    this.saveCharacter()
  // }
}
  title = "Dragon's Tail";
}
  
  // CharacterViewButton?.addEventListener(('click'), () => {
  //   console.log('clicked')
  //   characterView = false ? characterView : true
  // })

