import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ImageManagementComponent } from './components/image-management/image-management.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';

const routes: Routes = [
  { path: 'categories', component: CategoryManagementComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'images', component: ImageManagementComponent },
  { path: 'images/:id', component: ImageDetailComponent },
  { path: 'search', component: SearchImagesComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
