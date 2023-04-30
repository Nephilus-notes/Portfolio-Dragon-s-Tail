import { Component, OnInit } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';
import { SaveFile } from '../../models/saveFile';
import { LocationService } from '../../services/location.service';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';
import { Location } from '../../models/location';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.component.html',
  styleUrls: ['./load-game.component.css']
})
export class LoadGameComponent implements OnInit{
  constructor(private saveService:SaveFileService, private locationService: LocationService, 
    private characterService:CharacterService, private auth: AuthService,
    private messageService:MessageService) { 
      this.getAllSaves()
    }

  file!: SaveFile;
  character!: Character;
  location!: Location;

  Loading!: boolean;
  userSaveFiles?: Array<SaveFile>;


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

  getAllSaves() {
    console.warn("starting to load games")
    let usertoken:string | undefined;
    this.auth.user$.subscribe(user => usertoken = user?.sub)
    console.warn(usertoken)

    this.saveService.getUserSaveFiles(usertoken).subscribe( saves => {
      this.userSaveFiles = saves;
    })
  }
  
  ngOnInit(): void {
    this.messageService.add('initializing');
    console.warn("starting init")
    this.getAllSaves();
  }
}
