import { Component } from '@angular/core';
import { LOCATIONS } from '../locations';
import { Location } from '../location';

@Component({
  selector: 'app-backpack-display',
  templateUrl: './backpack-display.component.html',
  styleUrls: ['./backpack-display.component.css']
})
export class BackpackDisplayComponent {
  locations = LOCATIONS
  selectedLocation?: Location;
  onSelect(location: Location): void {
  this.selectedLocation = location;
}
}
