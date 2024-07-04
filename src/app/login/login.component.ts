import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.http.post('https://localhost:4200/login', payload).subscribe(
      (response) => {
        console.log(response);
        alert('Registration successful!');
        // Optionally, redirect the user to another page
        // window.location.href = '/success-page';
      },
      (error) => {
        console.error(error);
        alert('Registration failed!');
      }
    );
  }
}
