import { Component, Input, OnChanges } from '@angular/core';

import { Location } from '../../models/location';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.css']
})
export class TextDisplayComponent implements OnChanges{
  @Input() location!: Location;
  SG: string = "SG";
  placement:string = "enter"
  locationState: number = 0;

  ngOnChanges(): void {
    switch (this.locationState) {
      case 0: {
        this.placement = "enter";
        break;
      }
      case 1: {
        this.placement = "middle";
        console.warn(this.placement)
        break;
      }
      case 2: {
        this.placement = "exit";
        console.warn(this.placement)
        break;
      }
      default: {
        console.warn("changes hit")
      }
    }
  };

  incrementState(): void {
    if (this.locationState < 2) {
      this.locationState += 1
    }
    else {
      this.locationState = 0;
    }
    console.warn(this.locationState)
  }
}
