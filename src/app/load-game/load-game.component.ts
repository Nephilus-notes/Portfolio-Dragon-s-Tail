import { Component } from '@angular/core';
import { SaveFileService } from '../services/save-file.service';
import { SaveFile } from '../models/saveFile';
import { LocationService } from '../location.service';
import { CharacterService } from '../character.service';
import { Character } from '../character';
import { Location } from '../location';

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
    .subscribe(file => this.file = file)
    this.saveService.getSaveFile(3)
    .subscribe(file => console.warn(file))

  }

  loadCharacter(charID:number) {
    this.characterService.getCharacter(charID)
    .subscribe(character => this.character = character)
  }

  loadLocation(locationID:string) {
    this.locationService.getNewLocation(locationID)
    .subscribe(location => this.location = location)
  }

}
