import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // Fetch all IProducts (client-side filtering option)
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.base);
  }

  // Server-side filtered fetch example (uncomment to use)
  // getAllServerSide(params: any): Observable<IProduct[]> {
  //   // build query string according to json-server conventions (e.g. ?category=Mobile&_sort=price&_order=asc)
  //   return this.http.get<IProduct[]>(this.base, { params });
  // }

  getById(id: number) {
    return this.http.get<IProduct>(`${this.base}/${id}`);
  }

  create(Product: Partial<IProduct>) {
    return this.http.post<IProduct>(this.base, Product);
  }

  update(id: number, body: Partial<IProduct>) {
    return this.http.put<IProduct>(`${this.base}/${id}`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
