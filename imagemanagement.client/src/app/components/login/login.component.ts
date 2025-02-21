import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

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

        // Thông báo đăng nhập thành công
        Swal.fire({
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn quay trở lại.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 2000, // Tự động đóng sau 2 giây
          showConfirmButton: false // Ẩn nút OK, chỉ hiển thị 2s
        }).then(() => {
          this.router.navigate(['/categories']);
        });
      },
      error: (err) => {
        console.error('Login Failed:', err);

        // Thông báo lỗi khi đăng nhập
        Swal.fire({
          title: 'Đăng nhập thất bại!',
          text: err.error?.message || 'Tên đăng nhập hoặc mật khẩu không đúng.',
          icon: 'error',
          confirmButtonText: 'Thử lại'
        });
      },
    });
  }
}
