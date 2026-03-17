import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

type DesignLocation = 'NEW YORK' | 'COPENHAGEN' | 'DUBAI';

interface DesignCard {
  title: string;
  currentPrice: string;
  previousPrice: string;
  location: DesignLocation;
  image: string;
}

interface DesignResultVideo {
  title: string;
  subtitle: string;
  video: string;
  poster: string;
}

@Component({
  selector: 'app-designs-page',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './designs-page.component.html',
  styleUrls: ['./designs-page.component.css']
})
export class DesignsPageComponent implements OnInit, OnDestroy {
  selectedLocation: DesignLocation = 'NEW YORK';
  readonly locations: DesignLocation[] = ['NEW YORK', 'COPENHAGEN', 'DUBAI'];

  readonly designCards: DesignCard[] = [
    {
      title: 'The Vanderbilt Eagle I',
      currentPrice: '$ 3,750',
      previousPrice: '$ 4,350',
      location: 'NEW YORK',
      image: 'assets/apztattoo/designs/designs_image_33.png'
    },
    {
      title: 'Fractured Astronaut I',
      currentPrice: '$ 1,250',
      previousPrice: '$ 1,450',
      location: 'COPENHAGEN',
      image: 'assets/apztattoo/designs/designs_image_34.png'
    },
    {
      title: 'Liberty: Inner Forearm',
      currentPrice: '$ 2,500',
      previousPrice: '$ 2,900',
      location: 'DUBAI',
      image: 'assets/apztattoo/designs/designs_image_41.jpg'
    },
    {
      title: 'Christian: Arm Sleeve, Shoulder and Pec',
      currentPrice: '$ 16,250',
      previousPrice: '$ 18,850',
      location: 'NEW YORK',
      image: 'assets/apztattoo/designs/designs_image_42.png'
    },
    {
      title: 'Micro Realism',
      currentPrice: '$ 1,250',
      previousPrice: '$ 1,450',
      location: 'COPENHAGEN',
      image: 'assets/apztattoo/designs/designs_image_45.png'
    },
    {
      title: 'Arabic: Outer Upper Arm',
      currentPrice: '$ 3,750',
      previousPrice: '$ 4,350',
      location: 'DUBAI',
      image: 'assets/apztattoo/designs/designs_image_48.png'
    },
    {
      title: 'Greek: Posterior Forearm',
      currentPrice: '$ 2,500',
      previousPrice: '$ 2,900',
      location: 'NEW YORK',
      image: 'assets/apztattoo/designs/designs_image_54.png'
    },
    {
      title: 'Greek: Full Anterior Arm',
      currentPrice: '$ 5,000',
      previousPrice: '$ 5,800',
      location: 'COPENHAGEN',
      image: 'assets/apztattoo/designs/designs_image_57.png'
    },
    {
      title: 'Arabic: Inner Forearm',
      currentPrice: '$ 2,500',
      previousPrice: '$ 2,900',
      location: 'DUBAI',
      image: 'assets/apztattoo/designs/designs_image_60.png'
    },
    {
      title: 'Science: Inner Forearms',
      currentPrice: '$ 5,000',
      previousPrice: '$ 5,800',
      location: 'NEW YORK',
      image: 'assets/apztattoo/designs/designs_image_63.png'
    },
    {
      title: 'Classic: Full Front + Outer Arm',
      currentPrice: '$ 18,750',
      previousPrice: '$ 21,750',
      location: 'COPENHAGEN',
      image: 'assets/apztattoo/designs/designs_image_66.png'
    },
    {
      title: 'Greek: Full Front, Shoulders',
      currentPrice: '$ 16,250',
      previousPrice: '$ 18,850',
      location: 'DUBAI',
      image: 'assets/apztattoo/designs/designs_image_69.png'
    },
    {
      title: 'Roman: Full Back',
      currentPrice: '$ 18,750',
      previousPrice: '$ 21,750',
      location: 'NEW YORK',
      image: 'assets/apztattoo/designs/designs_image_73.png'
    }
  ];

  readonly designResultVideos: DesignResultVideo[] = [
    {
      title: 'Diseno 1',
      subtitle: 'Proceso y resultado final del diseno 1.',
      video: 'assets/apztattoo/designs/design_result_01.mp4',
      poster: 'assets/apztattoo/designs/result1.jpg'
    },
    {
      title: 'Diseno 2',
      subtitle: 'Comparacion de propuesta inicial y resultado del diseno 2.',
      video: 'assets/apztattoo/designs/design_result_02.mp4',
      poster: 'assets/apztattoo/designs/result3.png'
    },
    {
      title: 'Diseno 3',
      subtitle: 'Revision final del diseno 3 aplicado.',
      video: 'assets/apztattoo/designs/design_result_03.mp4',
      poster: 'assets/apztattoo/designs/result4.jpg'
    }
  ];

  constructor(
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'DESIGN COLLECTION | Apz Tattoo Artist',
      description:
        'Explore APZ tattoo design collection by location with current and previous price references.'
    });
    this.headerTheme.setTransparentTheme();
  }

  ngOnDestroy(): void {
    this.headerTheme.setDarkTheme();
  }

  setLocation(location: DesignLocation): void {
    this.selectedLocation = location;
  }

  get filteredDesignCards(): DesignCard[] {
    return this.designCards.filter((card) => card.location === this.selectedLocation);
  }
}
