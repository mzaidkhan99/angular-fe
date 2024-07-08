// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  constructor() { }

  isLoggedIn(): boolean {
    // Check session storage or any authentication service for login status
    return sessionStorage.getItem('isLogin') === 'true';
  }

  logout(): void {
    // Perform logout actions here (clear session storage, redirect, etc.)
    sessionStorage.removeItem('isLogin');
    // Optionally, redirect to login page or homepage
    // window.location.href = '/login'; // Example redirect to login page
  }
}