import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteImagesComponent } from './favorite-images.component';

describe('FavoriteImagesComponent', () => {
  let component: FavoriteImagesComponent;
  let fixture: ComponentFixture<FavoriteImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
