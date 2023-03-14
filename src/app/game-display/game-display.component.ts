import { Component } from '@angular/core';
import { Location } from '../location'

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {
  location: Location = {
    id: "BS",
    name: "Blacksmith's Shop",
    enterText: `You step into a shop with black and silver shining at you from all around as arms and armor coat the walls.
    The blacksmith's face shines at you from over the counter.`,
    exitText: "You exit the shop",
    options: {T: "Town", I: "Inn"},
    enemies: []
  }
}
