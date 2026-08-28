import { computed, Service, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart-item';

@Service()
export class CartService {

    private readonly _cartItems = signal<CartItem[]>([]);
    readonly cartItems = this._cartItems.asReadonly();

    readonly totalItems = computed(() => this._cartItems().reduce((total, item) => total + item.quantity, 0));

    addToCart(product: Product): void {
        //alert(`Added ${product.name} to cart! ${product.price}`);
        this._cartItems.update((items) => {
            const existingItem = items.find((item) => item.product.id === product.id);
            if (existingItem) {
                return items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...items, { product, quantity: 1 }];
            }
        });
    }

    increaseQuantity(productId: number): void {
        this._cartItems.update((items) => items.map((item) =>
            item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    }

    decreaseQuantity(productId: number): void {
        this._cartItems.update((items) => items
            .map((item) => item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
    }

    removeFromCart(productId: number): void {
        this._cartItems.update((items) => items.filter((item) => item.product.id !== productId));
    }
    

}
