import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCardComponent } from '../gallery-card/gallery-card.component';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule, GalleryCardComponent],
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent {
  @Input() items: Array<{
    id: string;
    title: string;
    image: string;
    style?: string;
    location?: string;
    priceRange?: string;
  }> = [];

  @Input() columns = 3;
}
