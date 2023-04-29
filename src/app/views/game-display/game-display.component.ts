import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { MessageService } from '../../services/message.service';
import { LocationService } from '../../services/location.service';
import { CombatControllerService } from '../../services/combat-controller.service';

import { Location } from '../../models/location';
import { Char } from '../../models/char';
import { Character } from '../../models/character';
import { NPC } from '../../models/npc';
import { SaveFileService } from 'src/app/services/save-file.service';

const CharacterViewButton = document.getElementById('characterViewButton');
let characterView = false;

const onClickCharacter = function () {
  if (characterView) {
    characterView = false;
  } else {
    characterView = true;
  }
  // characterView = false ? characterView : true
};

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css'],
})
export class GameDisplayComponent {
  constructor(
    private characterService: CharacterService,
    private messageService: MessageService,
    private locationService: LocationService,
    private combatService: CombatControllerService,
    private saveService: SaveFileService
  ) {
    // this.locationService.getLocations().subscribe(data => {
    //   console.warn(data)
    // })
  }
  exploring: number = 0;
  submitString!: string;
  CombatBool: boolean = false;
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
    this.characterService.getCharacter(1).subscribe((character) => {
      this.character = character;

      // console.warn(character);
    });
  }

  loadCharacter(): void {
    if (!this.characterService.characterCache && this.location.id != "SG") {
      // console.warn(`cache empty= ${this.characterService.characterCache}`);
      this.getCharacter();
      // this.messageService.add('loading failed');
    } else if (this.characterService.characterCache) {
      console.warn(`cache full = ${this.characterService.characterCache}`);
      this.character = this.characterService.loadCharacter();
      // this.messageService.add('Character Loaded');
    }
    else {
      
    }
  }
  cacheCharacter(): void {
    this.characterService.cacheCharacter(this.character);
  }

  public playerChoice($event: any): void {
    // this.messageService.add('player choice starting');
    if (this.CombatBool === true) {
      // this.messageService.add('player action');
      this.combatService.round(this.character, this.enemy, $event);
    } else {
      this.handleInput($event);
    }
  }

  /* START COMBAT LOGIC */

  
  /**
   * A switch function to determine what action the character takes based on the actionCall,
   * a string passed in from the input form.  4 options: A - Attack, E -Evade, D - Defend, and F - Flee
   *
   * @param actionCall
   */
 

  /* END COMBAT LOGIC */

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
    this.locationService
      .getNewLocation(submitString)
      .subscribe((location) => {
        this.location = location;
        console.warn(location)
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
    if (!this.locationService.locationCache) {
      this.changeLocation('SG');
      // console.warn(`Location Cache: ${this.locationService.locationCache}`)
    } else {
      this.location = this.locationService.locationCache;
      this.messageService.add('location Loaded');
    }
    console.warn(`Location Cache: ${this.locationService.locationCache}`);
  }
/**
 * A method that links into the character service to retrieve an enemy for combat.
 * 
 * Currently a hard code, but will change to dynamic api call with a primary key id parameter
 */
  getNPC(NPCID: number): void {
    this.characterService.getEnemy(NPCID).subscribe((enemy) => {
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
    });
  }
/**
 * A now unnecessary dev tool for entering combat state
 */
  combatToggle(): void {
    if (this.CombatBool) {
      this.CombatBool = false;
    } else {
      this.CombatBool = true;
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
    this.characterService.patchCharacter(this.character)
  }

  ngOnInit(): void {
    this.messageService.add('initializing');
    this.loadLocation();
    this.loadCharacter();
    // }
  }
  title: string = "Dragon's Tail";
  saveString:string = "post savefile"
  postChar:string = "patch character"
}
