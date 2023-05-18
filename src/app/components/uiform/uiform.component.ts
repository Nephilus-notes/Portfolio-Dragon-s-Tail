import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Character } from 'src/app/models/character';
import { CombatControllerService } from 'src/app/services/combat-controller.service';
import { MessageService } from 'src/app/services/message.service';
import { Ability } from 'src/app/models/ability';
import { NavLocation } from 'src/app/models/mapNavLocation';
import { ApiService } from 'src/app/services/api.service';
import { Location } from 'src/app/models/mapLocation';
import { ExplorationService } from 'src/app/services/exploration.service';

// function optionValidator(control: FormControl) {
//   let submitString = control.value
//   return null
// }

@Component({
  selector: 'app-uiform',
  templateUrl: './uiform.component.html',
  styleUrls: ['./uiform.component.css']
})
export class UIformComponent {

  constructor (private messageService: MessageService, private combatService: CombatControllerService, 
    private apiService: ApiService, public explorationService:ExplorationService) { }
  submitString = '';
  @Input() battleOngoing!: boolean;
  @Input() battleEndText!:string;


  @Input() location!: Location;
  @Input() CombatBool!: boolean;

  // @Input()combatOptions!: Array<string>;
  options!: Array<string>;

  @Input()character!: Character;

  @Output() gameStateChange = new EventEmitter<number>();
  public changeState(location_id:string) {
    switch (location_id) {
      case "I": {
        this.gameStateChange.emit(2)
        break;
      }
      case "B": {        
        this.gameStateChange.emit(1)
        break;
      }
      case "A": {
        this.gameStateChange.emit(1)
        break;
    }
    }
  }

  /**
   * An onClick event emitter that uses the api service to get a new location, 
   * caches it, and passes it to the game display component
   */
  @Output() newLocation = new EventEmitter<Location>();
  public changeLocation(locationPKID:string) {
    this.apiService.getNewLocation(locationPKID).subscribe(loc => {
      this.apiService.saveLocation(loc)
      this.newLocation.emit(loc)
      // console.warn(loc)
      this.gameStateChange.emit(0)
      this.explorationService.resetExploring()
    })
  }
/**
 * An onClick event emitter that starts a combat round with the player's 
 * selected ability as its parameter
 */
@Output() CombatOver = new EventEmitter();
public startRound(ability: Ability): void {
  this.CombatOver.emit(this.combatService.round(ability))
  // this.messageService.add(`${this.battleOngoing}`)
}


/**
 * An onClick event that starts a set of exploration logic
 * 
 */
@Output() startCombat = new EventEmitter();
public exploreStart() {
  var explorationSuccessful = this.explorationService.explorationLogic(this.character, this.location)
  if (explorationSuccessful == true) {
    this.changeLocation(this.location.next);
  }
  else {
    // start combat using an emision to get the NPCS ready
    this.startCombat.emit(true)
  }
}

public goHunting(): void {
  this.explorationService.modifyPlayerExploration(this.character, this.location, true)
  this.startCombat.emit(true)
  // this.messageService.add("going hunting")
}
/** 
 * Probably don't need this, it's on combatDisplay.  Maybe should move here someday though
 */
@Output() CombatEnd = new EventEmitter();
  endCombat(): void {
    this.CombatEnd.emit(true);
    this.combatService.roundOrder = undefined;
    this.explorationService.setExploring(this.explorationService.checkExploration(this.character, this.location));
    this.character.fleeing = false;
  }
 
  // ngOnInit() {
  //   console.warn(this.locationOptions)
  // }
}
