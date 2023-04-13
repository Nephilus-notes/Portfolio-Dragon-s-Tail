import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// function optionValidator(control: FormControl) {
//   let submitString = control.value
//   return null
// }

@Component({
  selector: 'app-uiform',
  templateUrl: './uiform.component.html',
  styleUrls: ['./uiform.component.css']
})
export class UIformComponent {
  submitString = '';

  Control = new FormControl('', [
    Validators.required,
    // optionValidator
  ]);
  @Input() locationOptions!: Array<string>;
  @Input() CombatBool!: boolean;

  @Input()combatOptions!: Array<string>;
  options!: Array<string>;


  @Output() submitValue = new EventEmitter<string|null>();
  public onSubmit(): void {
    console.warn('clicking button')
    this.submitValue.emit(this.Control.value?.toUpperCase())
    this.Control.reset()
  }
ngOnChanges(): void {
  if (this.CombatBool) {
    this.options = this.combatOptions;
  } else {
    this.options = this.locationOptions;
  }
}
 
}
