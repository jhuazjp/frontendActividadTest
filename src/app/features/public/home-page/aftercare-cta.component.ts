import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-aftercare-cta',
  standalone: true,
  imports: [RouterLink, AssetUrlPipe],
  templateUrl: './aftercare-cta.component.html',
  styleUrls: ['./aftercare-cta.component.css']
})
export class AftercareCtaComponent {
  @Input() sideText = 'Tattoo Guidance';
  @Input() heading = 'Book Your Session';
  @Input() tag = 'NEXT STEP';
  @Input() buttonText = 'CONTACT';
  @Input() backgroundImage = 'assets/apztattoo/home/fondoafterCare.jpg';
  @Input() ctaRoute = '/contact';
}
