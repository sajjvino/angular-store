import { Component, computed, inject, signal } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../product';
import { MatIcon } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CartService } from '../../cart/cart-service';

@Component({
  imports: [ProductCard, MatIcon, MatInputModule, FormsModule, MatFormFieldModule],
  selector: 'app-products-grid',
  styleUrl: './products-grid.scss',
  templateUrl: './products-grid.html',
})
export class ProductsGrid {

  private cartService = inject(CartService);

protected OnAddtoCart(product: Product) {
  this.cartService.addToCart(product);
}

protected readonly searchTerm = signal('');

protected readonly products = signal<Product[]>([
    {
        id: 1,
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 19.99,
        originalPrice: 29.99,
    },
    {
        id: 2,
        name: 'Smartwatch',
        description: 'Stylish smartwatch with fitness tracking features',
        price: 99.99
    },
    {
        id: 3,
        name: 'Gaming Mouse',
        description: 'Ergonomic gaming mouse with customizable buttons',
        price: 49.99,
        originalPrice: 69.99,
    },
    {
        id: 4,
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with excellent sound quality',
        price: 39.99
    },
    {
        id: 5,
        name: 'Fitness Tracker',
        description: 'Waterproof fitness tracker with heart rate monitoring',
        price: 59.99,
        originalPrice: 79.99,
    },
    {
        id: 6,
        name: 'Wireless Earbuds',
        description: 'Compact wireless earbuds with long battery life',
        price: 29.99
    },


]);

protected readonly filteredProducts = computed<Product[]>(() => {
    const term = this.searchTerm().toLowerCase();

    if(!term) {
        return this.products();
    }else {
    return this.products().filter(
      product => product.name.toLowerCase().includes(term) || 
      product.description.toLowerCase().includes(term));
    }
  });

// protected clearSearch() {
//     this.searchTerm.set('');
//   } 

//   protected trimSearch() {
//     this.searchTerm.update(term => term.trim());
//   }

}
