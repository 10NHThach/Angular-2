import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule để sử dụng router-outlet
import { NavbarComponent } from './components/navbar/navbar.component'; // Import app-navbar


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Import RouterModule để sử dụng <router-outlet>
    NavbarComponent, // Import NavbarComponent để sử dụng <app-navbar>
  ],
})
export class AppComponent {
  title = 'imagemanagement.client';
}
