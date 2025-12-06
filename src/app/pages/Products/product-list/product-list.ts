import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { DynamicTable } from '../../../shared/components/dynamic-table/dynamic-table';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, DynamicTable, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {
  products: IProduct[] = [];

  loading = false;

  filterState = {
    search: '',
    category: '',
    stock: 'in',
  };

  columns = [
    { field: 'name', header: 'Name', sortable: true, isLink: true, link: '/products/view/:id' },
    { field: 'sku', header: 'SKU', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'stock', header: 'Stock', sortable: true },
  ];

  constructor(
    @Inject(ProductService) private readonly service: ProductService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;

    this.service
      .getAll()
      // .pipe(
      //   catchError(() => of([])),
      //   finalize(() => (this.loading = false))
      // )
      .subscribe((res: any) => {
        const data = res?.data ?? res ?? [];
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  handleSort(event: any) {
    const { field, direction } = event;

    this.products = [...this.products].sort((a: any, b: any) => {
      const A = a[field];
      const B = b[field];

      if (A < B) return direction === 'asc' ? -1 : 1;
      if (A > B) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  handleAction(event: any) {
    if (event['type'] == 'edit') {
      this.redirectToEdit(event['row']['id']);
    }
    if (event['type'] == 'delete') {
      this.deleteProduct(event['row']['id']);
    }
  }
  redirectToEdit(productId: string) {
    this.router.navigateByUrl(`/products/edit/${productId}`);
  }

  deleteProduct(productId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(productId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The product has been removed.', 'success');
            this.load();
          },
          error: () => {
            Swal.fire('Error', 'Unable to delete the product.', 'error');
          },
        });
      }
    });
  }
}
