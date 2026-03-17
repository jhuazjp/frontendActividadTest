import { Component, Input } from '@angular/core';
import { AssetUrlPipe } from '../../pipes/asset-url.pipe';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [AssetUrlPipe, CtaButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  @Input() eyebrow = 'APZ Tattoo';
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
  @Input({ required: true }) image = '';
  @Input() primaryLabel = 'View designs';
  @Input() primaryHref = '/designs';
  @Input() secondaryLabel = 'Contact us';
  @Input() secondaryHref = '/connect';
}
