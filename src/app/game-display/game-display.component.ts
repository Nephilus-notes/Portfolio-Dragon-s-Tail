import { Component } from '@angular/core';
import { CharacterService } from '../character.service';
import { MessageService } from '../message.service';
import { LocationService } from '../location.service';
import { CombatControllerService } from '../combat-controller.service';

import { Location } from '../location'
import { Character } from '../character';

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
      this.locationService.getLocations().subscribe(data => {
        console.warn(data)
      })
    }

  submitString!: string;
  CombatBool!:boolean;

  character!: Character;
  enemy!: Character;
  location!: Location;

  getCharacter(): void {
    this.characterService.getCharacter(10)
          .subscribe(character => this.character = character)
          this.characterService.getCharacter(10)
          .subscribe(character => console.warn(character))
  }

  loadCharacter(): void {
    this.characterService.loadCharacter()
  }
  saveCharacter(): void {
    this.characterService.saveCharacter(this.character)
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


  attack(self:Character, target:Character) {
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
    this.messageService.add("moving")
    if (this.location != null && this.location != undefined) {
      this.messageService.add(`changed to ${this.location.name}`)
    }
    if(submitString === 'C') {
this.messageService.add("trying next")
    this.messageService.add(this.location.next)  
    this.locationService.getNewLocation(this.location.next)
      .subscribe(location => this.location = location)
    } else {

      this.locationService.getNewLocation(submitString)
      .subscribe(location => this.location = location)

      // Console log of location data
       this.locationService.getNewLocation(submitString)
       .subscribe(location => console.warn(location))
    }
  }

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

    this.getCharacter();
    this.changeLocation("T");
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

