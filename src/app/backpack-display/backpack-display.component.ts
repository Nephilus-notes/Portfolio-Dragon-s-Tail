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
ngOnInit(): void {
    this.getCharacter();
}
 
  items: Array<Item> = this.character?.bag
}
