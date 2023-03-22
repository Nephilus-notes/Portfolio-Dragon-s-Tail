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

  LocationControl = new FormControl('', [
    Validators.required,
    // optionValidator
  ]);
  @Input() options!: Array<string>;

  @Output() submitValue = new EventEmitter<string|null>();
  public onSubmit(): void {

    this.submitValue.emit(this.LocationControl.value)
    this.LocationControl.reset()
  }

 
}
