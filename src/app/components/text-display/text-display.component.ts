import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

import { Location } from '../../models/mapLocation';

import { ApiService } from 'src/app/services/api.service';
import { Template } from 'src/app/models/template';
import { Character } from 'src/app/models/character';
import { ExplorationService } from 'src/app/services/exploration.service';
import { Ability } from 'src/app/models/ability';


@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.css']
})
export class TextDisplayComponent implements OnInit{
  constructor(private apiService: ApiService, public explorationService: ExplorationService) {}

  @Input() location!: Location;
  @Input() exploring!: number;
  SG: string = "SG";
  placement:string = "enter";
  // locationState: number = 0;
  templates!: Array<Template>;
  selectedTemplate?: Template;

  newCharacterAbilities!: Array<Ability>;



  @Output() submitValue = new EventEmitter<string|null>();
  public incrementState(): void {
    var locationState:number = this.explorationService.exploring
    if (locationState < 2) {
      this.explorationService.incrementExploring()
    }
    else if (this.location.id == "SG") {
      this.apiService.loadCharacter();
      this.submitValue.emit("T");
    } 
    else {
      this.explorationService.resetExploring();
    }
  }

  public onSelect(template: Template): void {
    if (this.selectedTemplate == template) {
      this.selectedTemplate = undefined;
    } else {
      this.selectedTemplate = template;
    }
  }

  @Output() loadingCharacter = new EventEmitter<boolean>();
  public chooseCharacter(template:Template) {

      var character = new Character(template.name, template.strength, template.dexterity, 
        template.constitution, template.intelligence, [template.ability]);

        this.apiService.getSingleAbility(1).subscribe(a => {
          character.abilities.unshift(a)

          this.apiService.getSingleAbility(2).subscribe(a=> {
            character.abilities.push(a)

            this.apiService.cacheCharacter(character);
            this.incrementState();
            this.selectedTemplate = undefined;
            this.loadingCharacter.emit(true)
          })
        })

  }


ngOnInit(): void {
    this.templates = this.apiService.loadTemplates()

}

}
