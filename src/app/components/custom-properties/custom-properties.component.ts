import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="custom-properties">
      <div class="property-list">
        <div *ngFor="let prop of properties" class="property-item">
          <span class="key">{{prop.key}}:</span>
          <input [value]="prop.value" (input)="updateValue(prop.key, $event)" class="value">
          <button (click)="removeProperty(prop.key)" class="remove-btn">×</button>
        </div>
      </div>
      
      <div class="add-property">
        <input [(ngModel)]="newKey" placeholder="Key" class="key-input">
        <input [(ngModel)]="newValue" placeholder="Value" class="value-input">
        <button (click)="addProperty()" [disabled]="!newKey" class="add-btn">Add</button>
      </div>
    </div>
  `,
  styles: [`
    .custom-properties {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .property-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .key {
      min-width: 100px;
      font-weight: bold;
    }
    .value {
      flex: 1;
      margin: 0 0.5rem;
      padding: 0.25rem;
    }
    .remove-btn {
      padding: 0.25rem 0.5rem;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .add-property {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    .key-input, .value-input {
      padding: 0.25rem;
      flex: 1;
    }
    .add-btn {
      padding: 0.25rem 1rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .add-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomPropertiesComponent {
  @Input() set profile(value: any) {
    if (value) {
      this.properties = Object.entries(value)
        .filter(([key]) => !['type', 'available', 'backlog'].includes(key))
        .map(([key, value]) => ({ key, value }));
    }
  }

  @Output() profileChange = new EventEmitter<any>();

  properties: Array<{key: string, value: any}> = [];
  newKey: string = '';
  newValue: string = '';

  updateValue(key: string, event: any) {
    const property = this.properties.find(p => p.key === key);
    if (property) {
      property.value = event.target.value;
      this.emitChange();
    }
  }

  removeProperty(key: string) {
    this.properties = this.properties.filter(p => p.key !== key);
    this.emitChange();
  }

  addProperty() {
    if (this.newKey && !this.properties.some(p => p.key === this.newKey)) {
      this.properties.push({ key: this.newKey, value: this.newValue });
      this.newKey = '';
      this.newValue = '';
      this.emitChange();
    }
  }

  private emitChange() {
    const profile = this.properties.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as any);
    this.profileChange.emit(profile);
  }
}