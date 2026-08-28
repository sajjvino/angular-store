import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CartService } from '../cart/cart-service';
import { MatBadge } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartSummary } from '../cart/cart-summary/cart-summary';

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatBadge, RouterLink, RouterLinkActive, CartSummary],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

protected cartService = inject(CartService);



}
