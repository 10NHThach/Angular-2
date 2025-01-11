import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { DanhMuc } from '../../models/danhmuc.model';
import { CategoryDialogComponent, DeleteConfirmDialog } from '../dialogs/category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
  ],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent {
  categories: DanhMuc[] = [];
  displayedColumns: string[] = ['ten', 'moTa', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: DanhMuc[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Lỗi khi tải danh mục:', error);
      }
    );
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { title: 'Tạo danh mục mới', ten: '', moTa: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newCategory: DanhMuc = {
          id: 0,
          ten: result.ten,
          moTa: result.moTa,
          hinhAnhs: [],
        };

        this.categoryService.createCategory(newCategory).subscribe(
          () => {
            this.loadCategories();
          },
          (error) => {
            console.error('Lỗi khi tạo danh mục:', error);
          }
        );
      }
    });
  }

  editCategory(category: DanhMuc) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: { title: 'Sửa danh mục', ...category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.updateCategory(category.id, result).subscribe(
          () => {
            this.loadCategories();
          },
          (error) => {
            console.error('Lỗi khi sửa danh mục:', error);
          }
        );
      }
    });
  }

  deleteCategory(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px',
      data: { message: 'Bạn có chắc muốn xóa danh mục này?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          () => {
            this.loadCategories();
          },
          (error) => {
            console.error('Lỗi khi xóa danh mục:', error);
          }
        );
      }
    });
  }
}
