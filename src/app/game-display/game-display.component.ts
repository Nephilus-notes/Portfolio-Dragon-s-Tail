import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { LocationService } from '../location.service';
import { CombatControllerService } from '../combat-controller.service';

import { Location } from '../location'
import { Char } from '../char';
import { Character } from '../character';
import { NPC } from '../npc';

const CharacterViewButton = document.getElementById("characterViewButton")
let characterView = false;

const onClickCharacter = function () {
  if (characterView) {
    characterView = false
  } else {
    characterView = true
  }
  // characterView = false ? characterView : true
}


@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {

  constructor(private characterService: CharacterService, private messageService: 
    MessageService, private locationService: LocationService, private combatService: CombatControllerService) {
      // this.locationService.getLocations().subscribe(data => {
      //   console.warn(data)
      // })
    }

  submitString!: string;
  CombatBool!:boolean;

  character!: Character;
  enemy!: NPC;
  location!: Location;

  getCharacter(): void {
    this.characterService.getCharacter(28)
          .subscribe(character => this.character = character)
          this.characterService.getCharacter(28)
          .subscribe(character => console.warn(character))
  }

  loadCharacter(): void {
    if(!this.characterService.characterCache) {
      console.warn(`cache empty= ${this.characterService.characterCache}`)
      this.getCharacter();
      this.messageService.add("loading failed");
    } else {
      console.warn(`cache full = ${this.characterService.characterCache}`)
      this.character = this.characterService.loadCharacter();
      this.messageService.add("Character Loaded");
    }

  }
  cacheCharacter(): void {
    this.characterService.cacheCharacter(this.character)
  }

  public playerChoice($event:any): void {
    this.messageService.add("player choice starting")
    if (this.CombatBool === true) {
      this.messageService.add("player action")
      this.round($event);
    } else {

      this.changeLocation($event)
    }
  }

  /* START COMBAT LOGIC */


  attack(self:Character|NPC, target:Character|NPC): void {
    let damage: number = this.combatService.attack(self, target);
    if (damage) {
      target.currentHP -= damage;
    }
    this.messageService.add("attack")
  }
/**
 * A switch function to determine what action the character takes based on the actionCall,
 * a string passed in from the input form.  4 options: A - Attack, E -Evade, D - Defend, and F - Flee
 * 
 * @param actionCall 
 */
  playerAction(actionCall:string) {
    this.messageService.add(`player action call ${actionCall}`)
    
      switch (actionCall){
        case "A": {
          this.attack(this.character, this.enemy);
          break;
        }
        case "D": {
          this.combatService.defend(this.character);
          break;
        }
        case "E": {
          this.combatService.evade(this.character);
          break;
        }
        case "F": {
          this.combatService.flee(this.character, this.enemy);
          break;
        }
      }
    }

 


  round(actionCall:string) {
    this.messageService.add(` character ${this.character.dexterity} enemy ${this.enemy.dexterity}`);
    if (this.character.dexterity >= this.enemy.dexterity) {
      this.playerAction(actionCall);
      this.attack(this.enemy, this.character);
    }
    else {
      this.attack(this.enemy, this.character);
      this.playerAction(actionCall);
    }
    this.CombatBool = this.combatService.checkCombatants(this.character, this.enemy)
  }




/* END COMBAT LOGIC */

/**
 * Defunct: Currently generates the first town entrance.  Will be replaced by an api call 
 * from the load screen in future iterations. 
 * 
 * @param submitString 
 */
  changeLocation(submitString:string): void {
    // this.messageService.add("moving")

    
    if (this.location != null && this.location != undefined) {
      this.messageService.add(`changed from ${this.location.name}`)
    }
    if(submitString === 'C') {
      var playerExplored = this.checkPlayerExploration()
      if (playerExplored > 3) {
        // startCombat()
      }
this.messageService.add("trying next")
    this.messageService.add(this.location.next)  
    this.locationService.getNewLocation(this.location.next)
      .subscribe(location => this.location = location)
    } else {

      this.locationService.getNewLocation(submitString)
      .subscribe(location => this.location = location)

      // Console log of location data
      //  this.locationService.getNewLocation(submitString)
      //  .subscribe(location => console.warn(location))
    }
  }

  checkPlayerExploration(): number {
    switch (this.location.id) {
      case "T": {
        return this.character.thagragsHopeExplored
      }
      case "W": {
        return this.character.webOfDepthsExplored
      }
      case "G": {
        return this.character.graithsGrottoExplored
      }
      case "Q": {
        return this.character.graithQueensLairExplored
      }
      case "K": {
        return this.character.kratabsFollyExplored
      }
      case "D": {
        return this.character.drippingDeathExplored
      }
      case "P": {
        return this.character.playersRespiteExplored
      }
      case "TTD": {
        return this.character.tailOfTheDragonExplored
      }
      default: {
        return 0
      }
    }
  }

  loadLocation() {
    // this.messageService.add("Loading")
    if(!this.locationService.locationCache) {
      this.changeLocation('T');
      // console.warn(`Location Cache: ${this.locationService.locationCache}`)
    } else {
      this.location = this.locationService.locationCache;
      this.messageService.add('location Loaded')
    }
    console.warn(`Location Cache: ${this.locationService.locationCache}`)
  };

  getNPC(): void {
    this.characterService.getEnemy()
          .subscribe(enemy => this.enemy = enemy)
  }

  combatToggle(): void {
    if (this.CombatBool) {
      this.CombatBool = false;
    }
    else {
      this.CombatBool = true
    }
  }



ngOnInit(): void {
    this.messageService.add("initializing")
    this.loadLocation();
    // this.getCharacter();
    this.loadCharacter();
    this.getNPC();
    this.CombatBool=false;
  // }
}
  title = "Dragon's Tail";
}
  
  // CharacterViewButton?.addEventListener(('click'), () => {
  //   console.log('clicked')
  //   characterView = false ? characterView : true
  // })
