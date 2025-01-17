import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.interface';
import { ProductPropertiesComponent } from '../product-properties/product-properties.component';
import { CustomPropertiesComponent } from '../custom-properties/custom-properties.component';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProductPropertiesComponent,
    CustomPropertiesComponent
  ],
  template: `
    <h2 mat-dialog-title>{{data.product ? 'Edit' : 'Create'}} Product</h2>
    <mat-dialog-content>
      <form #productForm="ngForm">
        <mat-form-field appearance="fill">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="product.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="product.description" name="description" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="fill" *ngIf="!data.product">
          <mat-label>SKU</mat-label>
          <input matInput [(ngModel)]="product.sku" name="sku" required>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Cost</mat-label>
          <input matInput type="number" [(ngModel)]="product.cost" name="cost" required min="0" step="0.01">
        </mat-form-field>

        <h3>Product Properties</h3>
        <app-product-properties
          [profile]="product.profile"
          (profileChange)="updateStandardProperties($event)">
        </app-product-properties>

        <h3>Custom Properties</h3>
        <app-custom-properties
          [profile]="product.profile"
          (profileChange)="updateCustomProperties($event)">
        </app-custom-properties>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!productForm.form.valid"
              (click)="onSubmit()">
        {{data.product ? 'Update' : 'Create'}}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    h3 {
      margin: 1.5rem 0 1rem;
    }
  `]
})
export class ProductDialogComponent {
  product: Product;
  standardProperties: any = {};
  customProperties: any = {};

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product }
  ) {
    this.product = data.product ? { ...data.product } : {
      name: '',
      description: '',
      sku: '',
      cost: 0,
      profile: {
        type: 'furniture',
        available: true
      }
    };
  }

  updateStandardProperties(properties: any) {
    this.standardProperties = properties;
    this.updateProfile();
  }

  updateCustomProperties(properties: any) {
    this.customProperties = properties;
    this.updateProfile();
  }

  private updateProfile() {
    this.product.profile = {
      ...this.standardProperties,
      ...this.customProperties
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.product);
  }
}