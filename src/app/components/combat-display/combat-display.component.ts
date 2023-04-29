import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../models/character';
import { MessageService } from '../../services/message.service';
import { NPC } from '../../models/npc';
import { CombatControllerService } from 'src/app/services/combat-controller.service';

@Component({
  selector: 'app-combat-display',
  templateUrl: './combat-display.component.html',
  styleUrls: ['./combat-display.component.css']
})
export class CombatDisplayComponent {
  @Input() combatant!: NPC;
  @Input() battleNotDone!: boolean;
  @Input() battleEndText!:string;

  @Output() CombatEnd = new EventEmitter();
  endCombat(): void {
    this.CombatEnd.emit(true);
  }

  constructor(public messageService: MessageService, private combatService: CombatControllerService) {}
}
