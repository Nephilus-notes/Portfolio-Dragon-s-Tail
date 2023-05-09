import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Character } from '../../models/character';
import { MessageService } from '../../services/message.service';
import { NPC } from '../../models/npc';
import { CombatControllerService } from 'src/app/services/combat-controller.service';
import { Ability } from '../../models/ability';

@Component({
  selector: 'app-combat-display',
  templateUrl: './combat-display.component.html',
  styleUrls: ['./combat-display.component.css']
})
export class CombatDisplayComponent {
  @Input() combatant!: NPC;
  @Input() battleNotDone!: boolean;
  @Input() battleEndText!:string;

  attackAbility: Ability = { 
    id:1,
    name: "Attack",
    effect: "damage", 
    description: "Strikes at the opponent with fists, fangs, claws, or weapons",
    affectedAttribute: "",
    modifier: 1,
    duration: 0,
    type:null
  }
  abilitiesArray!: Array<Ability>;

  @Output() CombatEnd = new EventEmitter();
  endCombat(): void {
    this.CombatEnd.emit(true);
  }
  public useAbility(ability:Ability): void {
    
    this.combatService.performAbility(this.combatService.playerCharacter, this.combatService.NPCEnemy, 
      this.attackAbility.effect, this.attackAbility.affectedAttribute,
      this.attackAbility.modifier,this.attackAbility.duration)
  }

  constructor(public messageService: MessageService, private combatService: CombatControllerService) {}
}
