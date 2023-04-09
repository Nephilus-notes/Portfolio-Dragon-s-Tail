import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from './location';
import { LOCATIONS } from './locations';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationCache!:Location;
  /**
   * Takes in a location ID, makes an api call to retrieve the location object 
   * associated with that ID, and returns it
   * 
   * @param loc_id - An id associated with a new location object, most likely a 
   * sanitized user input
   * @returns a location object
   */
  getNewLocation(loc_id:string): Location {

    // I want a locations variable from teh server
    // const locations = of()
    for (let location of LOCATIONS) {
      // this.messageService.add(`${location}`)
      if (location.id === loc_id) {
        // this.messageService.add(`${location.id} and ${loc_id}`)
        // this.messageService.add(`${location.name}`)
        return location
      } 
    }
    return  {
      id: "BS",
      name: "Blacksmith's Shop",
      enterText: `An error has occurred. Please go to town`,
      exitText: "You exit the shop",
      options: [ "T"],
      enemies: []
    }
  }
  saveLocation(location:Location) {
    this.locationCache = location
    this.messageService.add('location Saved')
  }
  /** 
  * Loads a location from the CharacterService cache without an API call
  *
  * @param none
  * @returns none
  *
  *
  */
  loadLocation() {
    this.messageService.add('location Loaded')
    return this.locationCache
  }

  constructor(private messageService: MessageService) { }
}
