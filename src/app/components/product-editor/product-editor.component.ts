import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../models/product.interface';
import { TypeSelectorComponent } from '../property-editors/type-selector.component';
import { AvailabilityToggleComponent } from '../property-editors/availability-toggle.component';
import { BacklogSpinnerComponent } from '../property-editors/backlog-spinner.component';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TypeSelectorComponent,
    AvailabilityToggleComponent,
    BacklogSpinnerComponent
  ]
})
export class ProductEditorComponent {
  product: Product;
  isEditing: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProductEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: { product?: Product }
  ) {
    this.isEditing = !!data.product;
    this.product = data.product
      ? { ...data.product }
      : {
          name: '',
          description: '',
          sku: '',
          cost: 0,
          profile: {
            type: 'furniture',
            available: true,
            backlog: 0
          }
        };
  }

  save(): void {
    this.dialogRef.close(this.product);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
