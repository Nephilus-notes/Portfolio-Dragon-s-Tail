import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Character } from '../models/character';
import { Location } from '../models/mapLocation';

@Injectable({
  providedIn: 'root'
})
export class ExplorationService {

  constructor(private apiService: ApiService) { }
exploring:number = 0;

/**
 * returns a boolean based on whether to enter combat or move. returns false if combat is necessary
 * and true if they can move on.
 * @param character 
 * @param location 
 */
  public explorationLogic(character:Character, location: Location): boolean {
    this.exploring= this.checkExploration(character,location);
    if (this.exploring < 3) {
      this.exploring ++;
      this.modifyPlayerExploration(character, location, this.exploring);
      // start combat 
      return false
    }
    else {
      this.modifyPlayerExploration(character, location, 2)
      this.exploring = 0;
      return true;  
    }
  }
/**
 * A switch that checks how much knowledge the player has of the area they are in.
 * 
 * Uses the location ID to determine which character attribute to return
 * @returns A number representing the character's knowledge of the area.
 */
  public checkExploration(character:Character, location: Location) {
    switch (location.id) {
      case 'U': {
        return character.thagragsHopeExplored;
      }
      case 'W': {
        return character.webOfDepthsExplored;
      }
      case 'G': {
        return character.graithsGrottoExplored;
      }
      case 'Q': {
        return character.graithQueensLairExplored;
      }
      case 'S': {
        return character.kratabsFollyExplored;
      }
      case 'D': {
        return character.drippingDeathExplored;
      }
      case 'P': {
        return character.playersRespiteExplored;
      }
      case 'TTD': {
        return character.tailOfTheDragonExplored;
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
  modifyPlayerExploration(character:Character, location:Location, newExploration: number): void {
    switch (location.id) {
      case 'U': {
        character.thagragsHopeExplored = newExploration;
        break;
      }
      case 'W': {
        character.webOfDepthsExplored = newExploration;
        break;
      }
      case 'G': {
        character.graithsGrottoExplored = newExploration;
        break;
      }
      case 'Q': {
        character.graithQueensLairExplored = newExploration;
        break;
      }
      case 'S': {
        character.kratabsFollyExplored = newExploration;
        break;
      }
      case 'D': {
        character.drippingDeathExplored = newExploration;
        break;
      }
      case 'P': {
        character.playersRespiteExplored = newExploration;
        break;
      }
      case 'TTD': {
        character.tailOfTheDragonExplored = newExploration;
        break;
      }
      default: {
       console.warn('Failed to change exploration number');
      }
    }
  }

  public changeLocation(loc_id:string) {
    this.apiService.getNewLocation(loc_id).subscribe(l => {
      this.apiService.saveLocation(l);
      return l
    })
  }
  
  public incrementExploring(): void {
    this.exploring += 1;
  };

  public resetExploring(): void {
    this.exploring = 0;
  }
}
