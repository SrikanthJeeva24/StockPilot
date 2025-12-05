import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

export interface TableColumn {
  field: string; // data field name
  header: string; // column label
  sortable?: boolean;
  width?: string;
}
@Component({
  selector: 'dynamicTable',
  imports: [CommonModule],
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
  page = 1;
  pagedData: any[] = [];

  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges() {
    this.updatePagination();
  }

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

  sortColumn(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.sort.emit({ field, direction: this.sortDirection });
  }

  onAction(type: string, row: any) {
    this.action.emit({ type, row });
  }
}
