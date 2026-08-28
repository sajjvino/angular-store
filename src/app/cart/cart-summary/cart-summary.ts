import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../cart-service';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-cart-summary',
  styleUrl: './cart-summary.scss',
  templateUrl: './cart-summary.html',
})
export class CartSummary {
  private readonly cartService = inject(CartService);

  protected readonly cartItems = this.cartService.cartItems;
}
