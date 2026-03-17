import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.css']
})
export class CtaButtonComponent {
  @Input({ required: true }) label = '';
  @Input() href = '/';
  @Input() external = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
