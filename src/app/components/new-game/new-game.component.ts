import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

import { Location } from '../../models/location';

import { CharacterService } from 'src/app/services/character.service';
import { Template } from 'src/app/models/template';
import { CharacterObject } from 'src/app/models/characterClass';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {
  @Input() location!: Location;
  SG: string = "SG";
  placement:string = "enter";
  locationState: number = 0;
  templates!: Array<Template>;
  selectedTemplate?: Template;

  @Output() submitValue = new EventEmitter<string|null>();
  public incrementState(): void {
    if (this.locationState < 2) {
      this.locationState += 1
    }
    else if (this.location.id == "SG") {
      this.submitValue.emit("T")
    } 
    else {
      this.locationState = 0;
    }
    console.warn(this.locationState)
  }

  public onSelect(template: Template): void {
    if (this.selectedTemplate == template) {
      this.selectedTemplate = undefined;
    } else {
      this.selectedTemplate = template;
    }
  }
  public chooseCharacter(template:Template) {
    var character = new CharacterObject(template.name, template.strength, template.dexterity, 
      template.intelligence, template.constitution,[template.ability]);
      this.characterService.cacheCharacter(character);
      this.incrementState();
      this.selectedTemplate = undefined;
  }

ngOnInit(): void {
    this.templates = this.characterService.loadTemplates()
}

 constructor(private characterService: CharacterService) {}
}
