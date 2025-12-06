import { Routes } from '@angular/router';

export const Product_Routes: Routes = [
  {
    path: 'list',
    loadComponent() {
      return import('./product-list/product-list').then((m) => m.ProductList);
    },
  },
  {
    path: 'add',
    loadComponent() {
      return import('./product-add/product-add').then((m) => m.ProductAdd);
    },
  },
  {
    path: 'edit/:id',
    loadComponent() {
      return import('./product-add/product-add').then((m) => m.ProductAdd);
    },
  },
  {
    path: 'view/:id',
    loadComponent() {
      return import('./product-view/product-view').then((m) => m.ProductView);
    },
  },
];
