import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';
import { AiTattooDesignerComponent } from './ai-tattoo-designer.component';
import { AftercareCtaComponent } from './aftercare-cta.component';
import { KindWord, KindWordsComponent } from './kind-words.component';
import { inject } from '@angular/core';

interface SelectedByItem {
  image: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, AssetUrlPipe, AiTattooDesignerComponent, AftercareCtaComponent, KindWordsComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly selectedByItems: SelectedByItem[] = [
    {
      image: 'assets/apztattoo/home/colletors1.jpg',
      name: 'Elizabeth Reiser',
      role: 'Business Coach'
    },
    {
      image: 'assets/apztattoo/home/colletors2.webp',
      name: 'Vida',
      role: 'Singer & Artist'
    },
    {
      image: 'assets/apztattoo/home/colletors3.jpg',
      name: 'Melodi',
      role: 'Singer'
    },
    {
      image: 'assets/apztattoo/home/colletors4.jpg',
      name: 'Ree',
      role: 'Nigerian Artist'
    },
    {
      image: 'assets/apztattoo/home/colletors5.webp',
      name: 'Sol Luna M',
      role: 'Musician'
    },
    {
      image: 'assets/apztattoo/home/colletors6.webp',
      name: 'Yassine Younes',
      role: 'Digital Creator'
    },
    {
      image: 'assets/apztattoo/home/colletors7.webp',
      name: 'Solal Avni',
      role: 'Actor'
    },
    {
      image: 'assets/apztattoo/home/colletors8.jpg',
      name: 'Jess Allen',
      role: 'American Football Player'
    }
  ];
  readonly selectedByLoopItems: SelectedByItem[] = [...this.selectedByItems, ...this.selectedByItems];

  readonly portfolioImages: string[] = [
    'assets/apztattoo/home/catalog1.png',
    'assets/apztattoo/home/catalog2.png',
    'assets/apztattoo/home/catalog3.jpg',
    'assets/apztattoo/home/catalog4.jpg',
    'assets/apztattoo/home/catalog5.png',
    'assets/apztattoo/home/catalog6.png',
    'assets/apztattoo/home/catalog7.jpg',
    'assets/apztattoo/home/catalog8.jpg',
    'assets/apztattoo/home/catalog9.png',
    'assets/apztattoo/home/catalog10.png',
    'assets/apztattoo/home/catalog11.jpg',
    'assets/apztattoo/home/catalog12.png',
    'assets/apztattoo/home/catalog13.jpg'
  ];
  readonly portfolioLoopImages: string[] = [...this.portfolioImages, ...this.portfolioImages];

  readonly designImages: string[] = [
    'assets/apztattoo/home/design1.png',
    'assets/apztattoo/home/design2.png',
    'assets/apztattoo/home/design3.png',
    'assets/apztattoo/home/design4.png',
    'assets/apztattoo/home/design5.png',
    'assets/apztattoo/home/design6.png',
    'assets/apztattoo/home/design7.png',
    'assets/apztattoo/home/design8.png',
    'assets/apztattoo/home/design9.png'
  ];
  readonly designLoopImages: string[] = [...this.designImages, ...this.designImages];

  readonly kindWords: KindWord[] = [
    {
      quote:
        'Just had my first session for a half sleeve with APZ and it is truly a stunning piece of art. APZ is a master of black and white classic realism.',
      author: 'DALTON BOYT',
      location: 'NEW YORK, USA.'
    },
    {
      quote:
        'Amazing process from concept to final execution. The piece flows perfectly with the body and feels intentional from every angle.',
      author: 'MELANI REYES',
      location: 'COPENHAGEN, DK.'
    },
    {
      quote:
        'The level of detail is insane. You can tell there is a full artistic direction behind every section of the design.',
      author: 'VIDA',
      location: 'DUBAI, UAE.'
    }
  ];

  kindWordIndex = 0;

  constructor(
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Tattoo Artist Copenhagen | Tattoo Shop New York | APZ Tattoo',
      description:
        'For quiet achievers: APZ creates museum-level connected tattoos with custom story-driven design and precision execution.'
    });
    this.headerTheme.setTransparentTheme();
    this.document.body.classList.add('home-route');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('home-route');
    this.headerTheme.setDarkTheme();
  }

  get activeKindWord(): KindWord {
    return this.kindWords[this.kindWordIndex] ?? this.kindWords[0];
  }

  nextKindWord(): void {
    this.kindWordIndex = (this.kindWordIndex + 1) % this.kindWords.length;
  }

  previousKindWord(): void {
    this.kindWordIndex = (this.kindWordIndex - 1 + this.kindWords.length) % this.kindWords.length;
  }

}
