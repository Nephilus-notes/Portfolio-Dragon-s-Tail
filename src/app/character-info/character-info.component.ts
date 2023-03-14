import { Component } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent {
character: Character = {
  name: "Craelios",
  bag: [],
  equippedItems: {'slot':{'head':"",'body':"",'hand':""}},
  armor: 4,
  resistance: 2,
  strength: 13,
  dexterity: 15,
  intelligence: 13,
  constitution: 16,
  hp: 32,
  max_mp: 26,
  damage: 5,
  abilities: [],
  current_hp: 32,
  current_mp: 26,
}
}
