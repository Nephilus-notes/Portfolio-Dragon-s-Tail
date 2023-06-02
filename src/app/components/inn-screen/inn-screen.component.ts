import { Component, Input, OnInit,  } from '@angular/core';

import { Location } from 'src/app/models/mapLocation';
import { Item } from 'src/app/models/item';
import { Character } from 'src/app/models/character';

import { SaveFileService } from 'src/app/services/save-file.service';
import { Ability } from 'src/app/models/ability';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-inn-screen',
  templateUrl: './inn-screen.component.html',
  styleUrls: ['./inn-screen.component.css']
})
export class InnScreenComponent {

  constructor(private saveService: SaveFileService, private apiService:ApiService) {}
  @Input() location!: Location;
  @Input() GameStateSwitch!: number;
  @Input() character!: Character;
  buildingID?: string;
  display?: string;
  saveText:string = "Save";
  levelText:string = "Level Stats";
  learnText:string = "Learn Abilities";
  backText: string = "Back";
  levelBool:boolean = false;
  learnBool: boolean = false;
  selectedAbility?: Ability;
  possibleAbilities: Array<Ability> = [];

  public ngOnChanges(): void {
    if (this.GameStateSwitch == 2) {
      this.buildingID = this.location.id
    }
    switch (this.buildingID) {

      case "A" : {
        this.display = "healing potions!";
      
        break;
      }
      case "B" : {
        this.display = "arms and armor";

        console.warn(this.display)
        break
      }
      case "I" : {
        this.display = "A nice glimpse into clan life"
      }
    }
    if (this.GameStateSwitch == 3) {

    }
  }

  public levelClick(): void {
    this.levelBool = true;
    console.warn(this.GameStateSwitch)
  }

  public learnClick(): void {
    this.learnBool = true;
    console.warn(this.GameStateSwitch)
  }

  public backClick(): void {
    if (this.levelBool || this.learnBool) {
      this.levelBool = false;
      this.learnBool = false;
    } else {
      this.GameStateSwitch = 0
    }
  }

  public saveGame(): void {
    console.warn(this.character)
    this.saveService.saveGame(this.location.id, this.character)
  }

  public healCharacter(): void {
    this.character.fullHeal()
  }

  public onSelect(ability: Ability): void {
    if (this.selectedAbility == ability) {
      this.selectedAbility = undefined;
    } else {
      this.selectedAbility = ability;
    }
    console.warn(this.selectedAbility)
  }

  public buyObject(): void {
    var level = this.selectedAbility!.level ? this.selectedAbility!.level : 1;
    if (this.character.currentCurrency > level * 50) {
      this.character.currentCurrency -= level * 50;
      // this.character.items = [];
      this.character.abilities.push(this.selectedAbility!);
      for (let i = 0; i < this.possibleAbilities.length; i++) {
        if (this.possibleAbilities[i].id === this.selectedAbility!.id) {
          this.possibleAbilities.splice(i,1);
          this.resetSelectedObject();
          console.warn(this.possibleAbilities)
          return;
        }
      }
    }
  }
  
    public resetSelectedObject(): void {
      this.selectedAbility = undefined;
    };
  
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
          if (!abilityIds.includes(tempAbilities[i].id))
          {
            this.possibleAbilities.push(tempAbilities[i])
          }
        }
      })
    }
    
    
    
    ngOnInit() {
      this.populateAbilities();
      this.buildingID = this.location.id;
    }

}
