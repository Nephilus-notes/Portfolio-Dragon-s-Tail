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
  abilitiesArray: Array<Ability> = [
    { 
      id:1,
      name: "Attack",
      effect: "damage", 
      description: "strikes at ",
      affectedAttribute: "",
      modifier: 1,
      duration: 0,
      type:null
    },
    { 
      id:2,
      name: "Flee",
      effect: "buff", 
      description: "attemps to retreat from combat.",
      affectedAttribute: "",
      modifier: 1,
      duration: 0,
      type:null
    }, 
    { 
      id:3,
      name: "Strengthen",
      effect: "buff", 
      description: "prepares to a massive strike",
      affectedAttribute: "damageValue",
      modifier: 0,
      duration: 0,
      type:null
    },
    { 
      id:4,
      name: "Evade",
      effect: "buff", 
      description: "focuses on footwork to increase evasion.",
      affectedAttribute: "evading",
      modifier: 0,
      duration: 0,
      type:null
    },
    { 
      id:5,
      name: "Defend",
      effect: "buff", 
      description: "concentrates energy on deflecting attacks for 2 rounds, increasing armor.",
      affectedAttribute: "defending",
      modifier: 0,
      duration: 0,
      type:null
    },
    { 
      id:6,
      name: "Aim",
      effect: "buff", 
      description: "Focusing on footwork to increase evasion.",
      affectedAttribute: "focusing",
      modifier: 0,
      duration: 0,
      type:null
    },
    { 
      id:2,
      name: "Heal I",
      effect: "heal", 
      description: "heals the target.",
      affectedAttribute: "",
      modifier: 1,
      duration: 0,
      type:null
    },
  ];
  
  @Output() CombatEnd = new EventEmitter();
  endCombat(): void {
    this.CombatEnd.emit(true);
  }



  constructor(public messageService: MessageService, private combatService: CombatControllerService) {}
}
