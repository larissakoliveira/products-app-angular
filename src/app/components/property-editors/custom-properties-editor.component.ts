import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface CustomProperty {
  key: string;
  value: string;
}

@Component({
  selector: 'app-custom-properties-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="custom-properties">
      <h3>Custom Properties</h3>
      
      <div class="property-list">
        @for (prop of properties; track prop.key) {
          <div class="property-item">
            <mat-form-field>
              <mat-label>Key</mat-label>
              <input matInput [value]="prop.key" readonly>
            </mat-form-field>
            
            <mat-form-field>
              <mat-label>Value</mat-label>
              <input
                matInput
                [(ngModel)]="prop.value"
                (ngModelChange)="onPropertyChange()"
              >
            </mat-form-field>
            
            <button
              mat-icon-button
              color="warn"
              (click)="removeProperty(prop)"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
      
      <div class="add-property">
        <mat-form-field>
          <mat-label>New Key</mat-label>
          <input
            matInput
            [(ngModel)]="newKey"
            [disabled]="isAddingProperty"
          >
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>New Value</mat-label>
          <input
            matInput
            [(ngModel)]="newValue"
            [disabled]="isAddingProperty"
          >
        </mat-form-field>
        
        <button
          mat-raised-button
          color="primary"
          (click)="addProperty()"
          [disabled]="!newKey || !newValue"
        >
          Add Property
        </button>
      </div>
    </div>
  `,
  styles: [`
    .custom-properties {
      margin: 1rem 0;
    }
    .property-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .property-item {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .add-property {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    mat-form-field {
      flex: 1;
    }
  `]
})
export class CustomPropertiesEditorComponent {
  @Input() properties: CustomProperty[] = [];
  @Output() propertiesChange = new EventEmitter<CustomProperty[]>();

  newKey: string = '';
  newValue: string = '';
  isAddingProperty = false;

  addProperty() {
    if (this.newKey && this.newValue) {
      this.properties = [
        ...this.properties,
        { key: this.newKey, value: this.newValue }
      ];
      this.newKey = '';
      this.newValue = '';
      this.onPropertyChange();
    }
  }

  removeProperty(prop: CustomProperty) {
    this.properties = this.properties.filter(p => p.key !== prop.key);
    this.onPropertyChange();
  }

  onPropertyChange() {
    this.propertiesChange.emit([...this.properties]);
  }
}