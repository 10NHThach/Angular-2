import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7156/api/Auth'; // Thay bằng URL server backend

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    console.log('Login Payload:', payload);
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      catchError((error) => {
        console.error('Error in AuthService (login):', error);
        return throwError(() => error);
      })
    );
  }

  register(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      catchError((error) => {
        console.error('Error in AuthService (register):', error);
        return throwError(() => error);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
