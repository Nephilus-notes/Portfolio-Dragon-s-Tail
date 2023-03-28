import { Component, Input } from '@angular/core';
import { Character } from '../character';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-combat-display',
  templateUrl: './combat-display.component.html',
  styleUrls: ['./combat-display.component.css']
})
export class CombatDisplayComponent {
  @Input() combatant!: Character;

  constructor(public messageService: MessageService) {}
}