import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDisplay } from './cart-display';

describe('CartDisplay', () => {
  let component: CartDisplay;
  let fixture: ComponentFixture<CartDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
