import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Thêm Router
import { ImageService } from '../../services/image.service';
import { HinhAnh } from '../../models/hinhanh.model';

@Component({
  selector: 'app-image-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  image!: HinhAnh;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.imageService.getImageById(id).subscribe(
      (data: HinhAnh) => {
        this.image = data;
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết hình ảnh:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/images']); // Quay lại trang quản lý hình ảnh
  }
}
