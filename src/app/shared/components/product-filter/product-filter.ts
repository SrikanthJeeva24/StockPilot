import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

export type SortOption = 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | '';

@Component({
  selector: 'Product-Filter',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter implements OnInit {
  @Input() categories: string[] = [];
  @Output() change = new EventEmitter<{
    search: string;
    category: string;
    stock: string;
    sort: SortOption | '';
  }>();

  searchControl = new FormControl('');
  category = '';
  stock = '';
  sort: SortOption | '' = '';

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.emitChange();
    });
  }

  emitChange() {
    this.change.emit({
      search: this.searchControl.value?.trim() || '',
      category: this.category,
      stock: this.stock,
      sort: this.sort,
    });
  }

  reset() {
    this.searchControl.setValue('');
    this.category = '';
    this.stock = '';
    this.sort = '';
    this.emitChange();
  }
}
