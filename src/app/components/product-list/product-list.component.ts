import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductEditorComponent } from '../product-editor/product-editor.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    MatTableModule
  ],
  template: `
    <div class="product-list-container">
      <div class="header">
        <h2>Products</h2>
        <button mat-raised-button color="primary" (click)="openCreateDialog()">
          Add Product
        </button>
      </div>

      <table class="product-table mat-elevation-z2">
        <thead>
          <tr>
            <th>Index</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products; track product.id) {
            <tr (click)="openEditDialog(product)">
              <td>{{product.id}}</td>
              <td>{{product.sku}}</td>
              <td>{{product.name}}</td>
              <td>{{product.cost | currency}}</td>
              <td>
                <button 
                  mat-icon-button 
                  color="primary"
                  (click)="openEditDialog(product); $event.stopPropagation()"
                >
                  <mat-icon>edit</mat-icon>
                </button>
                <button 
                  mat-icon-button 
                  color="warn"
                  (click)="confirmDelete(product); $event.stopPropagation()"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 1rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .product-table {
      width: 100%;
      border-collapse: collapse;
      th, td {
        padding: 1rem;
        text-align: left;
      }
      th {
        background-color: #f5f5f5;
      }
      tr {
        cursor: pointer;
        &:hover {
          background-color: #f8f8f8;
        }
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProductEditorComponent, {
      width: '90%',
      maxWidth: '600px',
      disableClose: false,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductEditorComponent, {
      width: '90%',
      maxWidth: '600px',
      disableClose: false,
      autoFocus: false,
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result.id, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  confirmDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${product.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id!).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}