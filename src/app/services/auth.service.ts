import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = new BehaviorSubject<string>('');
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        this.authToken.next(storedToken);
      }
    }
  }

  setAuthToken(token: string) {
    this.authToken.next(token);
    if (this.isBrowser) {
      localStorage.setItem('authToken', token);
    }
  }

  getAuthToken(): string {
    return this.authToken.value;
  }

  getToken(): string {
    return this.authToken.value;
  }

  isAuthenticated(): boolean {
    return !!this.authToken.value;
  }

  logout() {
    this.authToken.next('');
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
  }
}