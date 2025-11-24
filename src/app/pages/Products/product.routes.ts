import { Routes } from '@angular/router';

export const Product_Routes: Routes = [
  {
    path: 'list',
    loadComponent() {
      return import('./product-list/product-list').then((m) => m.ProductList);
    },
  },
];
