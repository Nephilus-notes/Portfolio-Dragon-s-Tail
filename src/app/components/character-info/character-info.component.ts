import { Component, Input } from '@angular/core';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent {
  @Input() character!: Character;

  /**
   * Add more logic to compute different attributes that depend on others
   * Once the full character objects are instantiated it will have more to do.
   */

}
