import { Component } from '@angular/core';
import { SaveFileService } from '../../services/save-file.service';
import { SaveFile } from '../../models/saveFile';
import { ApiService } from 'src/app/services/api.service';
import { Character } from '../../models/character';
import { Location } from '../../models/mapLocation';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {
  constructor(private saveService:SaveFileService, private apiService: ApiService, 
  private auth: AuthService,
  private messageService:MessageService) {     }

  file!: SaveFile;
  character!: Character;
  location!: Location;

  Loading!: boolean;
  startGame: boolean = false;
  userSaveFiles?: Array<SaveFile>;
  userID?:string;
  newGameBoolean!: boolean;


  loadSaveFile(saveFileID: number): void {
    this.Loading = true;
    this.saveService.getSaveFile(saveFileID)
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
    this.apiService.getCharacter(charID)
    .subscribe(character => {
      this.character = character
      // console.warn(character)
      this.apiService.cacheCharacter(character);
    });
  }

  getLocation(locationID:string) {
    this.apiService.getNewLocation(locationID)
    .subscribe(location => {
      this.location = location
      // console.warn(location)
      this.apiService.saveLocation(this.location);
    });
  }

  newGame(): void {
    this.Loading = true;
    this.apiService.getTemplates().subscribe(t=> {
      console.warn(t);
      this.apiService.cacheTemplates(t);
      this.Loading = false;
      this.startGame = true;
      this.newGameBoolean = true
    }
      
    )
  }

  
  getAllSaves() {
    console.warn("starting to load games")
    if (this.auth.isAuthenticated$) {

      let usertoken:string | undefined;
      this.auth.user$.subscribe(user => {
        usertoken = user?.sub
        console.warn(usertoken)
        
            this.saveService.getUserSaveFiles(usertoken).subscribe( saves => {
              this.userSaveFiles = saves;
            })
      })
    }
  };
  
  ngOnInit(): void {
    console.warn(environment.AuthDomain)
    this.auth.user$.subscribe(
      user=> {
        this.userID = user?.sub
      }
    )
    this.messageService.add('initializing');
    console.warn("starting init")
    this.getAllSaves();
  }

}
