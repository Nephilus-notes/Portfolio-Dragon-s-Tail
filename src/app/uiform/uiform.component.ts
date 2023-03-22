import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-uiform',
  templateUrl: './uiform.component.html',
  styleUrls: ['./uiform.component.css']
})
export class UIformComponent {
  submitString = new FormControl('', Validators.required);

  @Output() submitValue = new EventEmitter<string|null>();
  public onSubmit(): void {

    this.submitValue.emit(this.submitString.value)
  }

 
}
