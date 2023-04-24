import { Component } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';
import { SaveFile } from '../../models/saveFile';
import { LocationService } from '../../services/location.service';
import { CharacterService } from '../../services/character.service';
import { TemplateService } from 'src/app/services/template.service';
import { Character } from '../../models/character';
import { Location } from '../../models/location';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {
  constructor(private saveService:SaveFileService, private locationService: LocationService, 
    private characterService:CharacterService, private templateService: TemplateService) { }

  file!: SaveFile;
  character!: Character;
  location!: Location;

  Loading!: boolean;


  loadSaveFile() {
    this.Loading = true;
    this.saveService.getSaveFile(1)
    .subscribe(file => {
      this.file = file;
      this.getCharacter(file.playerCharacterID);
      this.getLocation(file.locationID);
      this.Loading = false;
      
    })
    // this.saveService.getSaveFile(3)
    // .subscribe(file => console.warn(file))
  }

  getCharacter(charID:number) {
    this.characterService.getCharacter(charID)
    .subscribe(character => {
      this.character = character
      // console.warn(character)
      this.characterService.cacheCharacter(character);
    });
  }

  getLocation(locationID:string) {
    this.locationService.getNewLocation(locationID)
    .subscribe(location => {
      this.location = location
      // console.warn(location)
      this.locationService.saveLocation(this.location);
    });

    
  }

}
