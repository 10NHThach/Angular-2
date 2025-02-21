import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ImageService } from '../../services/image.service';
import { HinhAnh } from '../../models/hinhanh.model';

@Component({
  selector: 'app-favorite-images',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './favorite-images.component.html',
  styleUrls: ['./favorite-images.component.css']
})
export class FavoriteImagesComponent implements OnInit {
  favoriteImages: HinhAnh[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.loadFavoriteImages();
  }

  loadFavoriteImages() {
    this.imageService.getImages().subscribe((images: HinhAnh[]) => {
      this.favoriteImages = images.filter(image => image.isFavorite);
    });
  }
}
