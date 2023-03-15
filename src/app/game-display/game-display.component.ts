import { Component } from '@angular/core';
import { Location } from '../location'

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
    options: [ "(T)Town", "(I)Inn"],
    enemies: []
  }
}
  
  // CharacterViewButton?.addEventListener(('click'), () => {
  //   console.log('clicked')
  //   characterView = false ? characterView : true
  // })

