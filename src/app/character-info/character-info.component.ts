import { Component } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent {
  character: Character [] = [];
  constructor(private characterService: CharacterService) {}

  getCharacter(): void {
    this.characterService.getCharacter()
          .subscribe(character => this.character = character)
  }
ngOnInit(): void {
    this.getCharacter();
}

}
