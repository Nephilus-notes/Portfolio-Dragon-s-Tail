import { Injectable } from '@angular/core';
import { Location } from './location';
import { LOCATIONS } from './locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  getLocations(): Location[] {
    return LOCATIONS
  }

  constructor() { }
}
