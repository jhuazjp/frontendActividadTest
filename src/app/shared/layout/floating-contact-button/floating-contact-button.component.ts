import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-contact-button',
  standalone: true,
  templateUrl: './floating-contact-button.component.html',
  styleUrls: ['./floating-contact-button.component.css']
})
export class FloatingContactButtonComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
