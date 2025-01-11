import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Để điều hướng
import { ImageService } from '../../services/image.service';
import { HinhAnh } from '../../models/hinhanh.model';
import { ImageDialogComponent, DeleteConfirmDialog } from '../dialogs/image-dialog/image-dialog.component';

@Component({
  selector: 'app-search-images',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css'],
})
export class SearchImagesComponent {
  searchTerm = { ten: '', moTa: '' };
  searchResults: HinhAnh[] = [];

  constructor(
    private imageService: ImageService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  search() {
    this.imageService.getImages().subscribe((images) => {
      this.searchResults = images.filter(
        (image) =>
          (!this.searchTerm.ten || image.ten.includes(this.searchTerm.ten)) &&
          (!this.searchTerm.moTa || image.moTa.includes(this.searchTerm.moTa))
      );
    });
  }

  clearSearch() {
    this.searchTerm = { ten: '', moTa: '' };
    this.searchResults = [];
  }

  viewImage(image: HinhAnh) {
    // Điều hướng sang trang chi tiết
    this.router.navigate(['/images', image.id]);
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
            this.search(); // Tải lại kết quả tìm kiếm sau khi sửa
          },
          (error) => {
            console.error('Lỗi khi sửa hình ảnh:', error);
          }
        );
      }
    });
  }

  deleteImage(imageId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px',
      data: { message: 'Bạn có chắc muốn xóa hình ảnh này?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.imageService.deleteImage(imageId).subscribe(
          () => {
            this.search(); // Tải lại kết quả tìm kiếm sau khi xóa
          },
          (error) => {
            console.error('Lỗi khi xóa hình ảnh:', error);
          }
        );
      }
    });
  }
}
