import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base = environment.apiUrl + '/products';

  constructor(private readonly http: HttpClient) {}

  // GET ALL PRODUCTS
  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.base}`);
  }

  // GET PRODUCT BY UUID
  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.base}/${id}`);
  }

  // CREATE PRODUCT
  create(product: Partial<IProduct>): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.base}/create`, product);
  }

  // UPDATE PRODUCT
  update(id: string, body: Partial<IProduct>): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.base}/updateproduct/${id}`, body);
  }

  // DELETE PRODUCT
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/deleteproduct/${id}`);
  }
}
