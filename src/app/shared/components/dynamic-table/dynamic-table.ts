import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  isLink?: boolean;
  link?: string;
}

@Component({
  selector: 'dynamicTable',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.css',
})
export class DynamicTable implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = 10;

  @Output() sort = new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();
  @Output() action = new EventEmitter<{ type: string; row: any }>();
  Math = Math;
  // Dropdown
  isDropdownOpen = false;

  // Search
  searchQuery = '';
  originalData: any[] = [];

  page = 1;
  pagedData: any[] = [];

  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges() {
    this.originalData = [...this.data];
    this.updatePagination();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  formatLink(template: string = '', row: any): string {
    if (!template) return '';

    // Replace all :params using row data
    return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => row[key] ?? '');
  }

  // SEARCH
  applySearch() {
    const q = this.searchQuery.toLowerCase();

    this.data = q
      ? this.originalData.filter((row) =>
          Object.values(row).some((val) => String(val).toLowerCase().includes(q))
        )
      : [...this.originalData];

    this.page = 1;
    this.updatePagination();
  }

  // PAGINATION
  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.data.slice(start, end);
  }

  changePage(next: boolean) {
    const totalPages = Math.ceil(this.data.length / this.pageSize);
    if (next && this.page < totalPages) this.page++;
    if (!next && this.page > 1) this.page--;
    this.updatePagination();
  }

  // SORTING
  sortColumn(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.data = [...this.data].sort((a, b) => {
      const A = a[field];
      const B = b[field];
      if (A < B) return this.sortDirection === 'asc' ? -1 : 1;
      if (A > B) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.page = 1;
    this.updatePagination();
  }

  onAction(type: string, row: any) {
    this.action.emit({ type, row });
  }
}
