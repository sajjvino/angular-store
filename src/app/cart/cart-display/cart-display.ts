import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart-service';

@Component({
  imports: [CurrencyPipe, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule],
  selector: 'app-cart-display',
  styleUrl: './cart-display.scss',
  templateUrl: './cart-display.html',
})
export class CartDisplay {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  protected readonly cartItems = this.cartService.cartItems;
  protected readonly totalItems = this.cartService.totalItems;
  protected readonly subtotal = computed(() => this.cartItems().reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  ));
  protected readonly discount = computed(() => this.cartItems().reduce(
    (total, item) => total + Math.max((item.product.originalPrice ?? item.product.price) - item.product.price, 0) * item.quantity,
    0,
  ));
  protected readonly tax = computed(() => (this.subtotal() * 0.1));
  protected readonly total = computed(() => this.subtotal() - this.discount() + this.tax());

  protected increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  protected decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  protected removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  protected proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
