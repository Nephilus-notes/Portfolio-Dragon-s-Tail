import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { MessageService } from '../../services/message.service';
import { LocationService } from '../../services/location.service';
import { CombatControllerService } from '../../services/combat-controller.service';

import { Location } from '../../models/location';
import { Char } from '../../models/char';
import { Character } from '../../models/character';
import { NPC } from '../../models/npc';

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
    private combatService: CombatControllerService
  ) {
    // this.locationService.getLocations().subscribe(data => {
    //   console.warn(data)
    // })
  }

  submitString!: string;
  CombatBool!: boolean;
  ShopBool!: boolean;

  character!: Character;
  enemy!: NPC;
  location!: Location;

  getCharacter(): void {
    this.characterService
      .getCharacter(1)
      .subscribe((character) => {

        this.character = character
        // if (this.character.items == null) {
        //   this.character.items = []
        // }
        // this.character.equippedItems = {
        //   head: null,
        //   body: null,
        //   hand: null
        // }
        console.warn(character)
      });
    
  }

  loadCharacter(): void {
    if (!this.characterService.characterCache) {
      console.warn(`cache empty= ${this.characterService.characterCache}`);
      this.getCharacter();
      // this.messageService.add('loading failed');
    } else {
      console.warn(`cache full = ${this.characterService.characterCache}`);
      this.character = this.characterService.loadCharacter();
      // this.messageService.add('Character Loaded');
    }
  }
  cacheCharacter(): void {
    this.characterService.cacheCharacter(this.character);
  }

  public playerChoice($event: any): void {
    // this.messageService.add('player choice starting');
    if (this.CombatBool === true) {
      // this.messageService.add('player action');
      this.round($event);
    } else {
      this.changeLocation($event);
    }
  }

  /* START COMBAT LOGIC */

  attack(self: Character | NPC, target: Character | NPC): void {
    let damage: number = this.combatService.attack(self, target);
    if (damage) {
      target.currentHP -= damage;
    }
    // this.messageService.add('attack');
  }
  /**
   * A switch function to determine what action the character takes based on the actionCall,
   * a string passed in from the input form.  4 options: A - Attack, E -Evade, D - Defend, and F - Flee
   *
   * @param actionCall
   */
  playerAction(actionCall: string) {
    // this.messageService.add(`player action call ${actionCall}`);

    switch (actionCall) {
      case 'A': {
        this.attack(this.character, this.enemy);
        break;
      }
      case 'D': {
        this.combatService.defend(this.character);
        break;
      }
      case 'E': {
        this.combatService.evade(this.character);
        break;
      }
      case 'F': {
        this.combatService.flee(this.character, this.enemy);
        break;
      }
    }
  }

  round(actionCall: string) {
    // this.messageService.add(
    //   ` character ${this.character.dexterity} enemy ${this.enemy.dexterity}`
    // );
    if (this.character.dexterity >= this.enemy.dexterity) {
      this.playerAction(actionCall);
      this.attack(this.enemy, this.character);
    } else {
      this.attack(this.enemy, this.character);
      this.playerAction(actionCall);
    }
    this.CombatBool = this.combatService.checkCombatants(
      this.character,
      this.enemy
    );
  }

  /* END COMBAT LOGIC */

  /**
   * Defunct: Currently generates the first town entrance.  Will be replaced by an api call
   * from the load screen in future iterations.
   *
   * @param submitString
   */
  changeLocation(submitString: string): void {
    if (this.ShopBool == true) {
      this.ShopBool = false;
    }
    if (submitString === 'S' && this.location.id == "A" || submitString === "S" && this.location.id == "B") {
      this.ShopBool = true
    }
    else if (submitString === 'C') {
      var playerExplored = this.checkPlayerExploration();
      if (playerExplored < 3) {
        playerExplored++;
        this.modifyPlayerExploration(playerExplored)
        this.startCombat();

        playerExplored = Math.floor(playerExplored/2)
        this.modifyPlayerExploration(playerExplored)
        this.locationService
          .getNewLocation(this.location.next)
          .subscribe((location) => (this.location = location));
        }
      } else {
        this.locationService
          .getNewLocation(submitString)
          .subscribe((location) => (this.location = location));
      }
  }

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

  modifyPlayerExploration(newExploration: number): void {
    switch (this.location.id) {
      case 'U': {
        this.character.thagragsHopeExplored = newExploration;
        break
      }
      case 'W': {
        this.character.webOfDepthsExplored = newExploration;
        break
      }
      case 'G': {
        this.character.graithsGrottoExplored = newExploration;
        break
      }
      case 'Q': {
        this.character.graithQueensLairExplored = newExploration;
        break
      }
      case 'S': {
        this.character.kratabsFollyExplored = newExploration;
        break
      }
      case 'D': {
        this.character.drippingDeathExplored = newExploration;
        break
      }
      case 'P': {
        this.character.playersRespiteExplored = newExploration;
        break
      }
      case 'TTD': {
        this.character.tailOfTheDragonExplored = newExploration;
        break
      }
      default: {
        this.messageService.add(this.location.id)
        this.messageService.add("Failed to change exploration number");
      }
    }
  }

  loadLocation() {
    // this.messageService.add("Loading")
    if (!this.locationService.locationCache) {
      this.changeLocation('B');
      // console.warn(`Location Cache: ${this.locationService.locationCache}`)
    } else {
      this.location = this.locationService.locationCache;
      this.messageService.add('location Loaded');
    }
    console.warn(`Location Cache: ${this.locationService.locationCache}`);
  }

  getNPC(): void {
    this.characterService.getEnemy().subscribe((enemy) => (this.enemy = enemy));
  }

  combatToggle(): void {
    if (this.CombatBool) {
      this.CombatBool = false;
    } else {
      this.CombatBool = true;
    }
  }

  shopToggle(): void {
    if (this.ShopBool) {
      this.ShopBool = false;
    } else {
      this.ShopBool = true;
    }
  }

  startCombat() {
    this.generateNPC();
    this.CombatBool = true;
  }

  generateNPC() {
    var random = Math.random() * 1000;
    if (random <= 500) {
      this.messageService.add('common');
      // Grab the common enemy from the db
    } else if (random > 500 && random <= 850) {
      this.messageService.add('uncommon');
      // Grab the uncommon enemy by passing in its id
    } else if (random > 850 && random <= 995) {
      this.messageService.add('rare');
      // call getNPC(this.location.rareNPC)
    } else if (random > 995 && random <= 1000) {
      this.messageService.add('secret');
      // getNPC(this.location.secretNPC)
    } else {
      console.warn('shit happened. Check your math');
      // get a common enemy.
      this.getNPC();
    }
  }

  ngOnInit(): void {
    this.messageService.add('initializing');
    this.loadLocation();
    // this.getCharacter();
    this.loadCharacter();
    this.getNPC();
    this.CombatBool = false;
    // }
  }
  title = "Dragon's Tail";
}

// CharacterViewButton?.addEventListener(('click'), () => {
//   console.log('clicked')
//   characterView = false ? characterView : true
// })