import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login Successful:', response);
        this.authService.saveToken(response.token);
        alert('Đăng nhập thành công!');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        alert('Đăng nhập thất bại: ' + (err.error?.message || 'Lỗi không xác định.'));
      },
    });
  }
}
