import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

import { CombatControllerService } from '../../services/combat-controller.service';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '../../models/mapLocation';
import { Character } from '../../models/character';
import { NPC } from '../../models/npc';
import { SaveFileService } from 'src/app/services/save-file.service';


@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css'],
})
export class GameDisplayComponent {
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private combatService: CombatControllerService,
    private saveService: SaveFileService,
    private router: Router
  ) {
    // this.apiService.getLocations().subscribe(data => {
    //   console.warn(data)
    // })
  }
  exploring: number = 0;
  submitString!: string;
  CombatBool: boolean = false;
  battleOngoing: boolean = true;
  battleEndText!: string ;
  SG: string = "SG";
  /**
   * GameStateSwitch controls all non combat, non standard travel game states.
   *
   * 0 - Normal Game State
   *
   * 1 - Shop Screen (Only applied in Blacksmith and Alchemist locations)
   *
   * 2 - Inn Screen (only applied in Inn location)
   */
  GameStateSwitch: number = 0;

  character!: Character;
  enemy!: NPC;
  location!: Location;

  getCharacter(): void {
    this.apiService.getCharacter(1).subscribe((character) => {
      this.character = character;

      // console.warn(character);
    });
  }

  loadCharacter(): void {
    if (!this.apiService.characterCache && this.location.id != "SG") {
      // console.warn(`cache empty= ${this.apiService.characterCache}`);
      this.getCharacter();
      // this.messageService.add('loading failed');
    } else if (this.apiService.characterCache) {
      console.warn(`cache full = ${this.apiService.characterCache}`);
      this.character = this.apiService.loadCharacter();
      // this.messageService.add('Character Loaded');
    }
    else {
      
    }
  }
  cacheCharacter(): void {
    this.apiService.cacheCharacter(this.character);
  }

  public playerChoice($event: any): void {
    // this.messageService.add('player choice starting');
    if (this.CombatBool === true) {
     
      // this.messageService.add('player action');
      this.combatService.round(this.character, this.enemy, $event);
      this.battleOngoing = this.combatService.checkCombatants(this.character, this.enemy)

      if (this.battleOngoing == false) {
        if (this.character.currentHP > 0) {
          this.battleEndText = "You won!"
        }
        else {
          this.battleEndText = "Return to Town"
        }
      }
    } else {
      this.handleInput($event);
    }
  }


  /**
   * Takes the user input as a string and performs conditional checks to determine the next step.
   * 
   * Either changes the game state with the GameStateSwitch, triggers exploration and combat logic,
   * or performs the api call to move the character to the next location.
   *
   * @param submitString
   */
  handleInput(submitString: string): void {
    if (this.GameStateSwitch > 0) {
      this.GameStateSwitch = 0;
      this.messageService.add('got to gameStateCheck');
    }
    if (
      (submitString === 'S' && this.location.id == 'A') ||
      (submitString === 'S' && this.location.id == 'B')
    ) {
      this.GameStateSwitch = 1;
      this.messageService.add('got to shop check');
    } else if (submitString === 'S' && this.location.id == 'I') {
      this.GameStateSwitch = 2;
      this.messageService.add('got to Inn check');
    } else if (submitString === 'C') {
      this.exploring = this.checkPlayerExploration();
      this.messageService.add(`exploring ${this.exploring} vs pcexploring ${this.checkPlayerExploration()}`)
      this.messageService.add(`playerExplored ${ this.exploring}`);
      if ( this.exploring < 3) {
         this.exploring++;
        this.modifyPlayerExploration( this.exploring);
        this.startCombat();
      } else {
        this.modifyPlayerExploration(Math.floor( this.exploring / 2));
        console.warn(`exploring ${this.exploring}`)
        this.changeLocation(this.location.next);
      }
    } else {
      this.changeLocation(submitString);
      this.messageService.add(`Got to the else. string is ${submitString}`);
    }
  }
/**
 * Takes in user input as a string and uses it to make an api call to retrieve the next location 
 * from the db and load it.
 * @param submitString User input that has been vetted
 */
  changeLocation(submitString: string): void {
    this.apiService
      .getNewLocation(submitString)
      .subscribe((location) => {
        this.location = location;
        // console.warn(location)
      });
  }
/**
 * A switch that checks how much knowledge the player has of the area they are in.
 * 
 * Uses the location ID to determine which character attribute to return
 * @returns A number representing the character's knowledge of the area.
 */
  checkPlayerExploration(): number {
    switch (this.location.id) {
      case 'U': {
        return this.character.thagragsHopeExplored;
      }
      case 'W': {
        return this.character.webOfDepthsExplored;
      }
      case 'G': {
        return this.character.graithsGrottoExplored;
      }
      case 'Q': {
        return this.character.graithQueensLairExplored;
      }
      case 'S': {
        return this.character.kratabsFollyExplored;
      }
      case 'D': {
        return this.character.drippingDeathExplored;
      }
      case 'P': {
        return this.character.playersRespiteExplored;
      }
      case 'TTD': {
        return this.character.tailOfTheDragonExplored;
      }
      default: {
        return 0;
      }
    }
  }
/**
 * Increments the player's exploration valued for the current location
 * @param newExploration The new exploration value
 */
  modifyPlayerExploration(newExploration: number): void {
    switch (this.location.id) {
      case 'U': {
        this.character.thagragsHopeExplored = newExploration;
        break;
      }
      case 'W': {
        this.character.webOfDepthsExplored = newExploration;
        break;
      }
      case 'G': {
        this.character.graithsGrottoExplored = newExploration;
        break;
      }
      case 'Q': {
        this.character.graithQueensLairExplored = newExploration;
        break;
      }
      case 'S': {
        this.character.kratabsFollyExplored = newExploration;
        break;
      }
      case 'D': {
        this.character.drippingDeathExplored = newExploration;
        break;
      }
      case 'P': {
        this.character.playersRespiteExplored = newExploration;
        break;
      }
      case 'TTD': {
        this.character.tailOfTheDragonExplored = newExploration;
        break;
      }
      default: {
        this.messageService.add(this.location.id);
        this.messageService.add('Failed to change exploration number');
      }
    }
  }

  /**
   * Dev method that checks to see if a location is cached from saveFileService.
   * If the location is cached it loads it up, if not it calls a default location
   */
  loadLocation() {
    // this.messageService.add("Loading")
    if (this.apiService.templateCacheExists()) {
      this.changeLocation('SG');
      // console.warn(`Location Cache: ${this.apiService.locationCache}`)
    } else {
      this.location = this.apiService.locationCache;
      this.messageService.add('location Loaded');
    }
    console.warn(`Location Cache: ${this.apiService.locationCache}`);
  }
/**
 * A method that links into the character service to retrieve an enemy for combat.
 * 
 * Currently a hard code, but will change to dynamic api call with a primary key id parameter
 */
  getNPC(NPCID: number): void {
    this.apiService.getEnemy(NPCID).subscribe((enemy) => {
      this.enemy = new NPC(
        enemy.name,
        enemy.strength,
        enemy.dexterity,
        enemy.constitution,
        enemy.intelligence,
        enemy.armor,
        enemy.resistance,
        enemy.abilities,
        enemy.level
        );
      this.messageService.add(`got npc `);
      this.CombatBool = true;
      this.combatService.cacheNPC(this.enemy)
    });
  }
/**
 * A now unnecessary dev tool for entering combat state
 */
  combatToggle(): void {
    if (this.CombatBool) {
      this.CombatBool = false;
      this.messageService.add(`CombatBool = ${this.CombatBool}`)
    } else {
      this.CombatBool = true;
      this.messageService.add(`CombatBool = ${this.CombatBool}`)
    }
  }

  combatFinish(): void {
    this.CombatBool = false;
    this.battleOngoing = true;
    this.messageService.clear(true);
    if (this.character.currentHP <= 0) {
      this.character.fullHeal();
      this.changeLocation("T");
    }
  }
/**
 * A now unnecessary dev tool for entering different game states
 */
  shopToggle(): void {
    if (this.GameStateSwitch > 0) {
      this.GameStateSwitch = 0;
    } else if (
      (this.GameStateSwitch == 0 && this.location.id == 'A') ||
      (this.GameStateSwitch == 0 && this.location.id == 'B')
    ) {
      this.GameStateSwitch = 1;
    } else if (this.GameStateSwitch == 0 && this.location.id == 'I') {
      this.GameStateSwitch = 2;
    }
    console.warn(this.location.id);
    console.warn(this.GameStateSwitch);
  }

  /**
   * Potentially an entry point into the combat controller's combat loop, removing all combat logic 
   * except NPC generation from the game display/
   * 
   * Will require combatants to be passed as parameters
   */
  startCombat() {
    this.generateNPC();
    if (!this.combatService.combatPCExists()) {
      this.messageService.add(`caching for combat`)
      this.combatService.cachePC(this.character)
    }
    else {
      this.messageService.add(`no cache needed`)
    }
  }
/**
 * A function that determines which enemy to retrieve and generates it.
 * 
 * Currently uses a hard coded rat but will dynamically make api calls using 
 * the ID in the location's corresponding rarity attribute
 */
  private generateNPC(): void {
    var random = Math.random() * 1000;
    if (random <= 500) {
      this.messageService.add('common');
      // Grab the common enemy from the db
      return this.getNPC(this.location.commonNPC);

    } else if (random > 500 && random <= 850) {
      this.messageService.add('uncommon');
      // Grab the uncommon enemy by passing in its id
       return this.getNPC(this.location.uncommonNPC);
    } else if (random > 850 && random <= 995) {
      this.messageService.add('rare');
      // call getNPC(this.location.rareNPC)
       return this.getNPC(this.location.rareNPC);
    } else if (random > 995 && random <= 1000) {
      this.messageService.add('secret');
      // getNPC(this.location.secretNPC)
       return this.getNPC(this.location.secretNPC);
    } else {
      console.warn('shit happened. Check your math');
      // get a common enemy.
    }
    // This runs regardless of case right now.
    // this.getNPC();
  }
  saveGame(locationID:string) {
  
    this.saveService.postSaveFile(locationID, this.character)
    this.messageService.add("game saved?")
  }

  saveChar() {
    // console.warn(this.character)
    this.apiService.patchCharacter(this.character)
  }

  ngOnInit(): void {
    this.messageService.add('initializing');
    if(!this.apiService.characterCache && !this.apiService.templateCache) {
      // redirect to start game 
      this.router.navigate(['/startgame'])

    }
    if (this.apiService.templateCacheExists() === false) {
      this.loadCharacter();
    }
    this.loadLocation();
    // }
  }
  title: string = "Dragon's Tail";
}
