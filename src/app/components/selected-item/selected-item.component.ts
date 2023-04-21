import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Item } from 'src/app/models/item';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.css'],
})
export class SelectedItemComponent {
  @Input() character!: Character;
  @Input() location!: Location;
  @Input() selectedItem!: Item;

  @Output() chosenItem = new EventEmitter<boolean>();
  public buyItem(): void {
    this.chosenItem.emit(true);
  }

  @Output() selectedItemReset = new EventEmitter<boolean>();
  public cancel(): void {
    this.selectedItemReset.emit(false);
  }
}
