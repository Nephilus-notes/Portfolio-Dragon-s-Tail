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

  constructor (private messageService: MessageService, private combatService: CombatControllerService, private apiService: ApiService) { }
  submitString = '';
  @Input() battleOngoing!: boolean;
  @Input() battleEndText!:string;

  Control = new FormControl('', [
    Validators.required,
    // optionValidator
  ]);
  @Input() location!: Location;
  @Input() CombatBool!: boolean;

  @Input()combatOptions!: Array<string>;
  options!: Array<string>;

  @Input()character!: Character;


  @Output() submitValue = new EventEmitter<string|null>();
  public onSubmit(): void {
    // console.warn('clicking button')
    this.submitValue.emit(this.Control.value?.toUpperCase())
    this.Control.reset()
  }

  @Output() newLocation = new EventEmitter<Location>();
  public changeLocation(locationPKID:string) {
    this.apiService.getNewLocation(locationPKID).subscribe(loc => {

      this.newLocation.emit(loc)
      console.warn(loc)
    })
  }

@Output() CombatOver = new EventEmitter();
public startRound(ability: Ability): void {
  this.CombatOver.emit(this.combatService.round(ability))
  this.messageService.add(`${this.battleOngoing}`)
}
/** 
 * Probably don't need this, it's on combatDisplay.  Maybe should move here someday though
 */
@Output() CombatEnd = new EventEmitter();
  endCombat(): void {
    this.CombatEnd.emit(true);
  }
 
  // ngOnInit() {
  //   console.warn(this.locationOptions)
  // }
}
