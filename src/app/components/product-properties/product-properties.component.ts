import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="properties-editor">
      <div class="property-group">
        <label>Type:</label>
        <select [(ngModel)]="type" (ngModelChange)="updateProperties()">
          <option value="furniture">Furniture</option>
          <option value="equipment">Equipment</option>
          <option value="stationary">Stationary</option>
          <option value="part">Part</option>
        </select>
      </div>

      <div class="property-group">
        <label>
          <input type="checkbox" [(ngModel)]="available" (ngModelChange)="updateProperties()">
          Available
        </label>
      </div>

      <div class="property-group">
        <label>Backlog:</label>
        <input type="number" [(ngModel)]="backlog" (ngModelChange)="updateProperties()">
      </div>
    </div>
  `,
  styles: [`
    .properties-editor {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .property-group {
      margin-bottom: 1rem;
    }
    .property-group label {
      display: block;
      margin-bottom: 0.5rem;
    }
    select, input[type="number"] {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProductPropertiesComponent {
  @Input() set profile(value: any) {
    if (value) {
      this.type = value.type || 'furniture';
      this.available = value.available ?? true;
      this.backlog = value.backlog;
    }
  }

  @Output() profileChange = new EventEmitter<any>();

  type: string = 'furniture';
  available: boolean = true;
  backlog?: number;

  updateProperties() {
    const profile: any = {
      type: this.type,
      available: this.available,
    };
    if (this.backlog !== undefined) {
      profile.backlog = this.backlog;
    }
    this.profileChange.emit(profile);
  }
}