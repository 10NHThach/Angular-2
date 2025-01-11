import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router'; // Import Router để điều hướng
import { HinhAnh } from '../../models/hinhanh.model';
import { ImageDialogComponent, DeleteConfirmDialog } from '../dialogs/image-dialog/image-dialog.component';

@Component({
  selector: 'app-image-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css'],
})
export class ImageManagementComponent {
  images: HinhAnh[] = []; // Danh sách hình ảnh
  filteredImages: HinhAnh[] = []; // Danh sách sau khi lọc
  filterDate: Date | null = null; // Ngày lọc
  displayedColumns: string[] = ['ten', 'moTa', 'ngayDang', 'imageUrl', 'actions']; // Thêm cột ngày đăng

  constructor(private imageService: ImageService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadImages(); // Tải danh sách hình ảnh khi component khởi tạo
  }

  loadImages() {
    this.imageService.getImages().subscribe(
      (data: HinhAnh[]) => {
        this.images = data;
        this.filteredImages = data; // Khởi tạo danh sách ban đầu
      },
      (error) => {
        console.error('Lỗi khi tải danh sách hình ảnh:', error);
      }
    );
  }
  viewImage(image: HinhAnh): void {
    // Điều hướng đến trang chi tiết hình ảnh
    this.router.navigate(['/images', image.id]); // Điều hướng với id hình ảnh
  }
  createImage() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '400px',
      data: { title: 'Tạo hình ảnh mới', ten: '', moTa: '', imageUrl: '', danhMucId: null, ngayDang: new Date() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newImage: HinhAnh = {
          id: 0,
          ten: result.ten,
          moTa: result.moTa,
          danhMucId: result.danhMucId,
          imageUrl: result.imageUrl,
          ngayDang: new Date().toISOString(),
        };

        this.imageService.createImage(newImage).subscribe(
          () => {
            this.loadImages();
          },
          (error) => {
            console.error('Lỗi khi tạo hình ảnh:', error);
          }
        );
      }
    });
  }

  editImage(image: HinhAnh) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '400px',
      data: { title: 'Sửa hình ảnh', ...image },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedImage: HinhAnh = {
          ...image,
          ten: result.ten,
          moTa: result.moTa,
          imageUrl: result.imageUrl,
        };

        this.imageService.updateImage(updatedImage.id, updatedImage).subscribe(
          () => {
            this.loadImages();
          },
          (error) => {
            console.error('Lỗi khi sửa hình ảnh:', error);
          }
        );
      }
    });
  }

  deleteImage(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px',
      data: { message: 'Bạn có chắc muốn xóa hình ảnh này?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.imageService.deleteImage(id).subscribe(
          () => {
            this.loadImages(); // Reload danh sách hình ảnh
          },
          (error) => {
            console.error('Lỗi khi xóa hình ảnh:', error);
          }
        );
      }
    });
  }
}
