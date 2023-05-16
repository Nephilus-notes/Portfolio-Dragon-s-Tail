import { Component, Input, OnInit } from '@angular/core';
import { Ability } from 'src/app/models/ability';
import { Character } from 'src/app/models/character';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ability-learn',
  templateUrl: './ability-learn.component.html',
  styleUrls: ['./ability-learn.component.css']
})
export class AbilityLearnComponent {

  constructor(private apiService:ApiService) { }

  @Input() learnBool!:boolean;
  @Input() character!:Character;
  possibleAbilities: Array<Ability> = [];
  selectedAbility?: Ability;

public populateAbilities() {
  var tempAbilities: Array<any> = [];
  var abilityIds: Array<number> = []
  for (let ability of this.character.abilities) {
    abilityIds.push(ability.id)
  }
  this.apiService.getAllAbilities().subscribe((arr: Array<Ability>) => {
    tempAbilities = arr
    console.warn(arr)
    for (let i = 0; i < tempAbilities.length; i++){
      console.warn("searching")
      if (!abilityIds.includes(tempAbilities[i].id))
      {
        this.possibleAbilities.push(tempAbilities[i])
      }
    }
  })
  console.warn(`getting abiliities`)
}

public onSelect(ability: Ability): void {
  if (this.selectedAbility == ability) {
    this.selectedAbility = undefined;
  } else {
    this.selectedAbility = ability;
  }
}


ngOnInit() {
  this.populateAbilities()
}




}
