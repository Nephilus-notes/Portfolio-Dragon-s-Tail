import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

import { Location } from '../../models/location';

import { CharacterService } from 'src/app/services/character.service';
import { Template } from 'src/app/models/template';
import { CharacterObject } from 'src/app/models/characterClass';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.css']
})
export class TextDisplayComponent implements OnInit{
  @Input() location!: Location;
  @Input() exploring!: number;
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
      this.characterService.loadCharacter();
      this.submitValue.emit("T");
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

  @Output() loadingCharacter = new EventEmitter<boolean>();
  public chooseCharacter(template:Template) {
    var character = new CharacterObject(template.name, template.strength, template.dexterity, 
      template.intelligence, template.constitution,[template.ability]);
      this.characterService.cacheCharacter(character);
      this.incrementState();
      this.selectedTemplate = undefined;
      this.loadingCharacter.emit(true)
  }

ngOnInit(): void {
    this.templates = this.characterService.loadTemplates()
}

 constructor(private characterService: CharacterService) {}
}
