import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-group">
      <label for="type">Type</label>
      <select
        id="type"
        [ngModel]="value"
        (ngModelChange)="onChange($event)"
        class="form-control"
      >
        <option value="furniture">Furniture</option>
        <option value="equipment">Equipment</option>
        <option value="stationary">Stationary</option>
        <option value="part">Part</option>
      </select>
    </div>
  `
})
export class TypeSelectorComponent {
  @Input() value: string = 'furniture';
  @Output() valueChange = new EventEmitter<string>();

  onChange(value: string) {
    this.valueChange.emit(value);
  }
}