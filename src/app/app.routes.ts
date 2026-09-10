import { Routes } from '@angular/router';
import { ProductsGrid } from './products/products-grid/products-grid';
import { CartDisplay } from './cart/cart-display/cart-display';
import { Checkout } from './cart/checkout/checkout';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'products' },
	{ path: 'products', component: ProductsGrid },
    { path: 'cartitems', component: CartDisplay },
    { path: 'checkout', component: Checkout }
];
