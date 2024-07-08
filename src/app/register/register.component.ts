import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password,
      name: this.name,
      phone: this.phone
    };

    this.http.post('http://127.0.0.1:5000/register', payload).subscribe(
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
