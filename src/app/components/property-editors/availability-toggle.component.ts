import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-availability-toggle',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  template: `
    <div class="availability-toggle">
      <mat-checkbox
        [checked]="value"
        (change)="onChange($event.checked)"
      >
        Available
      </mat-checkbox>
    </div>
  `,
  styles: [`
    .availability-toggle {
      margin: 1rem 0;
    }
  `]
})
export class AvailabilityToggleComponent {
  @Input() value: boolean = true;
  @Output() valueChange = new EventEmitter<boolean>();

  onChange(checked: boolean) {
    this.valueChange.emit(checked);
  }
}