import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Product-Card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;
}
