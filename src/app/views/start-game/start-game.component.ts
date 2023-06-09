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
      // this.messageService.add(`characterid = ${file.playerCharacterID} location = ${file.locationID}`)
      
    })
  }

  getCharacter(charID:number) {
    this.apiService.getCharacter(charID)
    .subscribe(character => {
      var loadedCharacter = new Character(
        character.name,
        character.strength,
        character.dexterity,
        character.constitution,
        character.intelligence,
        character.abilities,
        character.kratabsFollyExplored,
        character.drippingDeathExplored,
        character.playersRespiteExplored,
        character.tailOfTheDragonExplored,
        character.thagragsHopeExplored,
        character.webOfDepthsExplored,
        character.graithsGrottoExplored,
        character.graithQueensLairExplored,
        character.items,
        character.equippedItems, 
        character.currentCurrency, 
        character.lifeTimeCurrency
        )
      this.character = loadedCharacter
      loadedCharacter.id = charID
      // console.warn(character)
      this.apiService.cacheCharacter(loadedCharacter);
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
      this.saveService.saveIDCache = undefined;
    }
      
    )
  }

  
  getAllSaves() {
    // console.warn("starting to load games")
    if (this.auth.isAuthenticated$) {

      let usertoken:string | undefined;
      this.auth.user$.subscribe(user => {
        usertoken = user?.sub
        // console.warn(usertoken)
        
            this.saveService.getUserSaveFiles(usertoken).subscribe( saves => {
              this.userSaveFiles = saves;
            })
      })
    }
  };
  
  ngOnInit(): void {
    // console.warn(`auth Link: ${environment.AuthDomain}`)
    // console.warn(`character api Link: ${environment.characterURL}`)
    // console.warn(`location Link: ${environment.locationURL}`)
    // console.warn(`savefile Link: ${environment.saveFileURL}`)
    // console.warn(`auth Link: ${environment.AuthDomain}`)
    this.auth.user$.subscribe(
      user=> {
        this.userID = user?.sub
      }
    )
    // this.messageService.add('initializing');
    // console.warn("starting init")
    this.getAllSaves();
  }

}
