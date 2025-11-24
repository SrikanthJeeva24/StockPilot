import { ProductFilter } from './../../../shared/components/product-filter/product-filter';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { catchError, of, finalize } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { ProductService } from '../../../shared/services/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ProductCard, ProductFilter],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  pagedProducts: IProduct[] = [];
  categories: string[] = [];

  // pagination
  page = 1;
  pageSize = 9;
  totalPages = 1;
  startIndex = 0;
  endIndex = 0;

  loading = false;

  // current filter state
  filterState = {
    search: '',
    category: '',
    stock: '',
    sort: '' as any,
  };

  constructor(@Inject(ProductService) private readonly service: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    // client-side—fetch all products once
    this.service
      .getAll()
      .pipe(
        catchError((_) => {
          console.error('Failed to load products');
          return of([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.products = res;
        console.log('All-Products:--', this.products);
        this.categories = Array.from(
          new Set(this.products.map((p) => p.category || '').filter(Boolean))
        );
        this.applyFilters();
      });
  }

  onFilterChange(state: any) {
    this.filterState = { ...this.filterState, ...state };
    this.page = 1;
    this.applyFilters();
  }

  applyFilters() {
    const s = (this.filterState.search || '').toLowerCase();
    let list = [...this.products];

    // Search
    if (s) {
      list = list.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(s) ||
          (p.sku || '').toLowerCase().includes(s) ||
          (p.category || '').toLowerCase().includes(s)
      );
    }

    // Category
    if (this.filterState.category) {
      list = list.filter((p) => p.category === this.filterState.category);
    }

    // Stock
    if (this.filterState.stock) {
      if (this.filterState.stock === 'in') list = list.filter((p) => p.stock > 0);
      if (this.filterState.stock === 'out') list = list.filter((p) => p.stock <= 0);
      if (this.filterState.stock === 'low') list = list.filter((p) => p.stock > 0 && p.stock < 10);
    }

    // Sort
    switch (this.filterState.sort) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // keep original order
        break;
    }

    this.filteredProducts = list;
    console.log('List', list);
    this.loading = false;
    this.setupPagination();
  }

  setupPagination() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
    if (this.page > this.totalPages) this.page = this.totalPages;
    this.startIndex = (this.page - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.filteredProducts.length);
    this.pagedProducts = this.filteredProducts.slice(this.startIndex, this.endIndex);
  }

  prevPage() {
    if (this.page <= 1) return;
    this.page--;
    this.setupPagination();
  }

  nextPage() {
    if (this.page >= this.totalPages) return;
    this.page++;
    this.setupPagination();
  }
}
