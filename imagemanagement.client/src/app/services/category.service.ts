import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DanhMuc } from '../models/danhmuc.model'; // Import model DanhMuc

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:7156/api/DanhMuc'; // Địa chỉ API backend

  constructor(private http: HttpClient) { }

  // Lấy danh sách danh mục
  getCategories(): Observable<DanhMuc[]> {
    return this.http.get<DanhMuc[]>(this.apiUrl);
  }

  // Lấy thông tin chi tiết một danh mục
  getCategoryById(id: number): Observable<DanhMuc> {
    return this.http.get<DanhMuc>(`${this.apiUrl}/${id}`);
  }

  // Thêm mới danh mục
  createCategory(category: DanhMuc): Observable<DanhMuc> {
    return this.http.post<DanhMuc>(this.apiUrl, category);
  }

  // Cập nhật thông tin danh mục
  updateCategory(id: number, category: DanhMuc): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  // Xóa danh mục
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
