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

    this.http.post('http://127.0.0.1:5000/login', payload).subscribe(
      (response) => {
        console.log(response);
        alert('login successful!');
        // Optionally, redirect the user to another page
        sessionStorage.setItem('isLogin', 'true');
        window.location.href = '/dashboard';
      },
      (error) => {
        sessionStorage.setItem('isLogin', 'false');
        console.error(error);
        alert('Registration failed!');
      }
    );
  }
}
