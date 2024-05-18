import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-dependency-injection',
  standalone: true,
  imports: [],
  templateUrl: './dependency-injection.component.html',
  styleUrl: './dependency-injection.component.scss',
})
export class DependencyInjectionComponent implements OnInit {
  products: { quantity: number; item: string; price: number }[] = [];
  productService: any;

  constructor() {
    this.productService = new ProductService();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.productService.getProducts();
    console.log(this.products);
  }
}
