import { Component, Inject, Input } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent {
@Input() item!: Item;
@Input() text!: string;


}
