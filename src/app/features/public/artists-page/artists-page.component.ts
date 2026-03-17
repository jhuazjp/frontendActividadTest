import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';

interface ArtistGuideCard {
  id: string;
  title: string;
  date: string;
  readTime: string;
  views: number;
  image: string;
  url: string;
}

@Component({
  selector: 'app-artists-page',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.css']
})
export class ArtistsPageComponent implements OnInit, OnDestroy {
  readonly artistGuides: ArtistGuideCard[] = [
    {
      id: 'ag-1',
      title: 'How to think outside the box?',
      date: 'May 6, 2025',
      readTime: '2 min read',
      views: 3,
      image: 'assets/apztattoo/artists/artists_gallery_02.webp',
      url: 'https://www.apztattoo.com/artists/how-to-think-outside-the-box'
    },
    {
      id: 'ag-2',
      title: "The Ultimate Tattoo Artist Beginner's checklist, 80+ Essentials You Need",
      date: 'Oct 23, 2024',
      readTime: '3 min read',
      views: 105,
      image: 'assets/apztattoo/artists/artists_gallery_04.webp',
      url: 'https://www.apztattoo.com/artists/essential-elements-to-become-the-best-tattoo-artist-in-2024'
    }
  ];

  constructor(
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'For Artist | Apz Tattoo Artist | NYC - CPH',
      description:
        'Learning resources for tattoo artists: mindset, portfolio, process and career growth from APZ experience.'
    });
    this.headerTheme.setTransparentTheme();
  }

  ngOnDestroy(): void {
    this.headerTheme.setDarkTheme();
  }

}
