import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;

  showDeleteModal = false;
  selectedProduct: any = null;

  openDeleteModal(product: any) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  confirmDelete() {
    console.log('Deleting:', this.selectedProduct);

    // TODO: Call delete API here

    this.closeDeleteModal();
  }
}
