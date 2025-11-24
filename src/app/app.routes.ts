import { Routes } from '@angular/router';
import { Product_Routes } from './pages/Products/product.routes';
import { MainLayout } from './shared/components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products/list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'products',
        children: Product_Routes,
      },
    ],
  },
];
