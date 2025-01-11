import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule
import { AppComponent } from './app.component'; // Standalone component

// Import Material modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Thêm FormsModule
    MatDialogModule, // Dialog module
    MatButtonModule, // Buttons in dialog
    MatFormFieldModule, // Form fields
    MatInputModule, // Input fields
    MatIconModule, // Icons for dialog
  ],
  bootstrap: [AppComponent], // Bootstrap trực tiếp standalone component
  providers: [provideAnimations()],
})
export class AppModule { }
