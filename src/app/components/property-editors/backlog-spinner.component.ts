import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-backlog-spinner',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="backlog-spinner">
      <mat-form-field>
        <mat-label>Backlog</mat-label>
        <input
          matInput
          type="number"
          [ngModel]="value"
          (ngModelChange)="onChange($event)"
          min="0"
          step="1"
        >
      </mat-form-field>
    </div>
  `,
  styles: [`
    .backlog-spinner {
      margin: 1rem 0;
    }
  `]
})
export class BacklogSpinnerComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  onChange(value: number) {
    if (value >= 0) {
      this.valueChange.emit(Math.floor(value));
    }
  }
}