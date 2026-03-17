import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [AssetUrlPipe],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: '[Apz] Classic Realism Tattoo Artist | New York - Copenhagen',
      description:
        'APZ Tattoo studio story, process and international workflow across New York, Copenhagen and Dubai.'
    });
  }

  ngOnDestroy(): void {
    this.headerTheme.setDarkTheme();
  }
}
