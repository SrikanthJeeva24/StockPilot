import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAllCategories() {
    return this.http.get<ICategory[]>(`${this.base}/category`);
  }
}
