import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CartService } from '../cart-service';

@Component({
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  selector: 'app-checkout',
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})
export class Checkout {
  private readonly cartService = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly cartItems = this.cartService.cartItems;
  protected readonly paymentMethod = signal<string>('creditCard');

  protected readonly subtotal = computed(() => 
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  protected readonly discount = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + Math.max((item.product.originalPrice ?? item.product.price) - item.product.price, 0) * item.quantity,
      0,
    )
  );

  protected readonly tax = computed(() => this.subtotal() * 0.1);
  protected readonly total = computed(() => this.subtotal() - this.discount() + this.tax());

  protected customerForm: FormGroup;

  constructor() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
    });
  }

  protected onPaymentMethodChange(method: string): void {
    this.paymentMethod.set(method);
  }

  protected placeOrder(): void {
    if (this.customerForm.valid && this.cartItems().length > 0) {
      const orderData = {
        customerDetails: this.customerForm.value,
        items: this.cartItems(),
        summary: {
          subtotal: this.subtotal(),
          discount: this.discount(),
          tax: this.tax(),
          total: this.total(),
        },
        paymentMethod: this.paymentMethod(),
      };

      console.log('Order placed:', orderData);
      alert(`Order placed successfully! Total: ${this.total().toFixed(2)}`);
      
      // Clear cart after successful order
      this.cartService.cartItems().forEach(item => {
        this.cartService.removeFromCart(item.product.id);
      });
      
      // Navigate back to products
      this.router.navigate(['/products']);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  protected continueShopping(): void {
    this.router.navigate(['/products']);
  }

  protected getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';
    
    if (field.errors['required']) return `${this.formatFieldName(fieldName)} is required`;
    if (field.errors['minLength']) return `${this.formatFieldName(fieldName)} must be at least ${field.errors['minLength'].requiredLength} characters`;
    if (field.errors['email']) return 'Please enter a valid email';
    if (field.errors['pattern']) return `${this.formatFieldName(fieldName)} format is invalid`;
    
    return '';
  }

  protected formatFieldName(fieldName: string): string {
    return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  }
}
