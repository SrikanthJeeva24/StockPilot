import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { ProductService } from '../../../shared/services/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
})
export class ProductView implements OnInit {
  productId: string = '';
  product: IProduct | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p: any) => {
      if (p['id']) {
        this.productId = p['id'];
        this.fetchProductById(this.productId);
      } else {
        this.productId = '';
      }
    });
  }

  fetchProductById(productId: string) {
    this.productService.getById(productId).subscribe({
      next: (resp: any) => {
        if (resp?.success) {
          this.product = resp.data;
          console.log('Product:', this.product);
          this.cdr.detectChanges();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Product Not Found',
            text: resp?.message || 'The product you are looking for does not exist.',
            confirmButtonColor: '#2563eb',
          });
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);

        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong while fetching the product.',
          confirmButtonColor: '#2563eb',
        });
      },
    });
  }
}
