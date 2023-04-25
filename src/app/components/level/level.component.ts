import { Component, Input,OnInit,OnChanges, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/character';

import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit{
@Input() character!: Character;
@Input() levelBool!: boolean;

plus:string = "+";
minus:string = "-";
Attributes!:number[];
attributeNames: string[] = ["Strength", "Dexterity", "Constitution", "Intelligence"]
saveChanges:string = "Save Changes";
back:string = "Back"


constructor(private messageService:MessageService) {}
// OnChanges() {
//   if (this.character) {
//     this.Attributes = [this.character.strength, this.character.dexterity, this.character.constitution, this.character.intelligence]
//     console.warn("stats")
//     console.warn(this.Attributes)
//   }
// }
incrementStat(i:number) {
  this.Attributes[i] += 1;
}

decrementStat(i:number): void {
  switch (i) {
    case 0 : {
        if (this.Attributes[i] > this.character.strength) {
          this.Attributes[i] -= 1;
        }
        break;
      }
    case 1 : {
        if (this.Attributes[i] > this.character.dexterity) {
          this.Attributes[i] -= 1;
        }
        break;
      }
    case 2: {
        if (this.Attributes[i] > this.character.constitution) {
          this.Attributes[i] -= 1;
        }
        break;
      }
    case 3 : {
        if (this.Attributes[i] > this.character.intelligence) {
          this.Attributes[i] -= 1;
        }
        break;
      }
  }
}

saveStats(): void {
  this.character.strength = this.Attributes[0];
  this.character.dexterity = this.Attributes[1];
  this.character.constitution = this.Attributes[2];
  this.character.intelligence = this.Attributes[3];
}

@Output() ReturnToMainInn = new EventEmitter<boolean>();
returnToInn(): void {
  this.ReturnToMainInn.emit(true);
}

ngOnInit(): void {
this.Attributes = [this.character.strength, this.character.dexterity, this.character.constitution, this.character.intelligence]
}
}
