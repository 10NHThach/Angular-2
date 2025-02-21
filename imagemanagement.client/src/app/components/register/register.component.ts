import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const payload = { username: this.username, email: this.email, password: this.password };

    this.authService.register(payload).subscribe({
      next: () => {
        // Hiển thị thông báo đăng ký thành công
        Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Bạn có thể đăng nhập ngay bây giờ.',
          icon: 'success',
          confirmButtonText: 'Đăng nhập',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err: any) => {
        console.error('Đăng ký thất bại:', err);

        // Hiển thị thông báo lỗi khi đăng ký thất bại
        Swal.fire({
          title: 'Đăng ký thất bại!',
          text: err.error?.message || 'Có lỗi xảy ra, vui lòng thử lại.',
          icon: 'error',
          confirmButtonText: 'Thử lại'
        });
      },
    });
  }
}
