import { Component } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent {
  character!: Character;
  constructor(private characterService: CharacterService, private messageService: MessageService) {}

  getCharacter(): void {
    this.characterService.getCharacter()
          .subscribe(character => this.character = character)
  }

  loadCharacter(): void {
    this.character = this.characterService.loadCharacter()
    // this.messageService.add(`{ this.character }`)
  }
  saveCharacter(): void {
    this.characterService.saveCharacter(this.character)
  }
ngOnInit(): void {
    this.getCharacter();
}

}
