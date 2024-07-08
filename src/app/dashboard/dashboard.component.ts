import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  products: any[] = [];
  showPopup = false;
  showAddPopup = false;
  currentProduct: any = {};
  newProduct: any = {};

  private apiUrl = 'http://127.0.0.1:5000/product';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {console.log('---data--', data);this.products = data.products},
      (error: any) => console.error('Failed to fetch products', error)
    );
  }

  openUpdatePopup(product: any) {
    this.currentProduct = { ...product };
    this.showPopup = true;
  }

  openAddPopup() {
    this.newProduct = {};
    this.showAddPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  closeAddPopup() {
    this.showAddPopup = false;
  }

  addProduct() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(`${this.apiUrl}/create`, this.newProduct, { headers: headers }).subscribe(
      () => {
        alert('Product added successfully');
        this.fetchProducts(); // Reload the product list
        this.closeAddPopup();
      },
      (error) => {
        console.error(`Error adding product`, error);
      }
    );
  }

  updateProduct() {
    console.log('---------------->>', this.currentProduct);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(`${this.apiUrl}/update/${this.currentProduct.id}`, this.currentProduct, { headers: headers }).subscribe(
      () => {
        console.log(`Product ${this.currentProduct.id} updated successfully`);
        this.fetchProducts(); // Reload the product list
        this.closePopup();
      },
      (error) => {
        console.error(`Error updating product ${this.currentProduct.id}:`, error);
      }
    );
  }

  deleteProduct(id: number) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      () => {
        console.log(`Product ${id} deleted successfully`);
        this.fetchProducts(); // Reload the product list
      },
      (error) => {
        console.error(`Error deleting product ${id}:`, error);
      }
    );
  }
}
