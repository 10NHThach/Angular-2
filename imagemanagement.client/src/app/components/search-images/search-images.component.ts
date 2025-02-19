import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule
import { ImageService } from '../../services/image.service';
import { HinhAnh } from '../../models/hinhanh.model';
import { ImageDialogComponent, DeleteConfirmDialog } from '../dialogs/image-dialog/image-dialog.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
    MatIconModule, // Thêm MatIconModule vào đây
    MatProgressSpinnerModule, // Thêm MatProgressSpinnerModule vào đây
  ],
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css'],
})
export class SearchImagesComponent {
  searchTerm = { ten: '', moTa: '' };
  searchResults: HinhAnh[] = [];
  loading = false;
  errorMessage = '';
  searchSubject = new Subject<{ ten: string; moTa: string }>();

  constructor(
    private imageService: ImageService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.search();
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  search() {
    if (!this.searchTerm.ten.trim() && !this.searchTerm.moTa.trim()) {
      this.errorMessage = 'Vui lòng nhập nội dung tìm kiếm!';
      this.searchResults = [];
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.imageService.getImages().subscribe(
      (images) => {
        this.searchResults = images.filter(
          (image) =>
            (!this.searchTerm.ten || image.ten.includes(this.searchTerm.ten)) &&
            (!this.searchTerm.moTa || image.moTa.includes(this.searchTerm.moTa))
        );
        this.loading = false;
        if (this.searchResults.length === 0) {
          this.errorMessage = 'Không tìm thấy hình ảnh phù hợp!';
        }
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm hình ảnh:', error);
        this.loading = false;
        this.errorMessage = 'Có lỗi xảy ra khi tìm kiếm!';
      }
    );
  }

  clearSearch() {
    this.searchTerm = { ten: '', moTa: '' };
    this.searchResults = [];
    this.errorMessage = '';
  }

  viewImage(image: HinhAnh) {
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
            this.search();
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
            this.search();
          },
          (error) => {
            console.error('Lỗi khi xóa hình ảnh:', error);
          }
        );
      }
    });
  }
}
