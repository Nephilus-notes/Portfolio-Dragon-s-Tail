import { Component } from '@angular/core';
import { Character } from '../character';
import { Item } from '../item'
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-backpack-display',
  templateUrl: './backpack-display.component.html',
  styleUrls: ['./backpack-display.component.css']
})
export class BackpackDisplayComponent {
  character!: Character;
  constructor(private characterService: CharacterService, private messageService: MessageService) {}

  getCharacter(): void {
    this.characterService.getCharacter()
          .subscribe(character => this.character = character)
  }

  loadCharacter(): Character {
    this.character = this.characterService.loadCharacter()
    return this.character
    // this.messageService.add(`{ this.character }`)
  }
  saveCharacter(): void {
    this.characterService.saveCharacter(this.character)
  }
ngOnInit(): void {
    // this.getCharacter();
    this.character = this.loadCharacter();
}
 
  items: Array<Item> = this.character?.bag
}
