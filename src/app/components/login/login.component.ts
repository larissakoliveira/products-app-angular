import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill">
              <mat-label>Authorization Key</mat-label>
              <input 
                matInput 
                type="password"
                name="authKey"
                [(ngModel)]="authKey"
                required
                #authKeyInput="ngModel"
              >
              <mat-error *ngIf="authKeyInput.invalid && authKeyInput.touched">
                Authorization key is required
              </mat-error>
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="!authKey.trim()"
            >
              Login
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }
    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class LoginComponent {
  authKey: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authKey.trim()) {
      this.authService.setAuthToken(this.authKey);
      this.router.navigate(['/products']);
    }
  }
}
