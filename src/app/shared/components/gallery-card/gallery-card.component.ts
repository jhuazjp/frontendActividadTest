import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '../../pipes/asset-url.pipe';

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) image = '';
  @Input() style = '';
  @Input() location = '';
  @Input() priceRange = '';
}
