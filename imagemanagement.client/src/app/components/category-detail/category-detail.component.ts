import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { DanhMuc } from '../../models/danhmuc.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule],
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent implements OnInit {
  category: DanhMuc | null = null; // Đảm bảo category có thể là null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.categoryService.getCategoryById(id).subscribe(
      (data) => {
        this.category = {
          ...data,
          hinhAnhs: data.hinhAnhs || [], // Đảm bảo hinhAnhs luôn là mảng
        };
      },
      (error) => {
        console.error('Lỗi khi tải danh mục:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
