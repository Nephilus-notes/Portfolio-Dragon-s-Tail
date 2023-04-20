import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../location';
import { environment } from 'src/environment/environment';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private messageService: MessageService, private http: HttpClient) { }
  locationCache!:Location;
  locations!: Location[];
  /**
   * Takes in a location ID, makes an api call to retrieve the location object 
   * associated with that ID, and returns it
   * 
   * @param loc_id - An id associated with a new location object, most likely a 
   * sanitized user input
   * @returns a location object
   */
  getNewLocation(loc_id:string): Observable<Location> {
    let url = `${environment.locationURL}${loc_id}`;

    const location = this.http.get<Location>(url)
    return location
  }

  saveLocation(location:Location): void {
    this.locationCache = location
    // console.warn(location)
    this.messageService.add('location Saved')
  }
  /** 
  * Loads a location from the CharacterService cache without an API call
  *
  * @param none
  * @returns a location object
  *
  *
  */
  loadLocation(): Location {
    this.messageService.add('location Loaded')
    return this.locationCache
  }

  cacheExists(): boolean {
    if(this.locationCache) {
      return true
    }
    return false
  }

  getLocations() {

    let url = environment.locationURL;

    return this.http.get<any>(url)
  }

}
