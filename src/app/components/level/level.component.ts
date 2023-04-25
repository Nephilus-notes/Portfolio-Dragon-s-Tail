import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent {
@Input() character!: Character;

plus:string = "+";
minus:string = "-";
Attributes!:number[];
// onChanges() {
//   if (this.character) {
//     this.Attributes = [this.character.strength, this.character.dexterity, this.character.constitution, this.character.intelligence]
//     console.warn("stats")
//     console.warn(this.Attributes)
//   }
// }
}
