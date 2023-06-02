import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ability } from 'src/app/models/ability';
import { Character } from 'src/app/models/character';
import { Item } from 'src/app/models/item';
import { Location } from 'src/app/models/mapLocation';

@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.css'],
})
export class SelectedItemComponent {
  @Input() character!: Character;
  @Input() location!: Location;
  @Input() selectedItem!: Item;
  @Input() selectedAbility!: Ability;

  @Output() chosenObject = new EventEmitter<boolean>();
  public buyObject(): void {
    this.chosenObject.emit(true);
  }

  @Output() selectedObjectReset = new EventEmitter<boolean>();
  public cancel(): void {
    this.selectedObjectReset.emit(false);
  }
}