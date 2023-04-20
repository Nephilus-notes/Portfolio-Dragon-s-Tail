import { Component } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';
import { SaveFile } from '../../models/saveFile';
import { LocationService } from '../../services/location.service';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../character';
import { Location } from '../../location';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.component.html',
  styleUrls: ['./load-game.component.css']
})
export class LoadGameComponent {
  constructor(private saveService:SaveFileService, private locationService: LocationService, 
    private characterService:CharacterService) { }

  file!: SaveFile;
  character!: Character;
  location!: Location;


  loadSaveFile() {
    this.saveService.getSaveFile(3)
    .subscribe(file => {
      this.file = file
      this.getCharacter(file.playerCharacterID);
      this.getLocation(file.locationID);
      
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
