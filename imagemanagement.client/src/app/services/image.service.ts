import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HinhAnh } from '../models/hinhanh.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'https://localhost:7156/api/HinhAnh';

  constructor(private http: HttpClient) { }

  getImages(): Observable<HinhAnh[]> {
    return this.http.get<HinhAnh[]>(this.apiUrl);
  }

  getImageById(id: number): Observable<HinhAnh> {
    return this.http.get<HinhAnh>(`${this.apiUrl}/${id}`);
  }

  createImage(image: HinhAnh): Observable<HinhAnh> {
    return this.http.post<HinhAnh>(this.apiUrl, image);
  }

  updateImage(id: number, image: HinhAnh): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, image);
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getFavoriteImages(): Observable<HinhAnh[]> {
    return this.http.get<HinhAnh[]>(`${this.apiUrl}/favorites`);
  }
  // 🔴 Toggle (Bật/Tắt) trạng thái yêu thích của ảnh
  toggleFavorite(id: number): Observable<HinhAnh> {
    return this.http.put<HinhAnh>(`${this.apiUrl}/toggle-favorite/${id}`, {});
  }

}
