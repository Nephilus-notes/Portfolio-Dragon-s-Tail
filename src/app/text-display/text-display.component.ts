import { Component, Input } from '@angular/core';

import { Location } from '../location';

@Component({
  selector: 'app-text-display',
  templateUrl: './text-display.component.html',
  styleUrls: ['./text-display.component.css']
})
export class TextDisplayComponent {
  @Input() location!: Location;
  
}
