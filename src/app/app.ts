import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './shared/layout/site-header/site-header.component';
import { SiteFooterComponent } from './shared/layout/site-footer/site-footer.component';
import { FloatingContactButtonComponent } from './shared/layout/floating-contact-button/floating-contact-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, FloatingContactButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
