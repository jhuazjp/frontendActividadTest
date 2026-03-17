import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

interface CatalogContactSlide {
  image: string;
  title: string;
  info: string;
  href: string;
  target: string;
  rel: string;
  ctaLabel: string;
  platform: 'whatsapp' | 'email' | 'instagram' | 'messenger' | 'call';
}

interface CatalogRateCard {
  image: string;
  title: string;
  priceRange: string;
  copy: string;
  href: string;
  location: 'NEW YORK' | 'COPENHAGEN' | 'DUBAI';
  studio: string;
}

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe],
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('galleryTrack', { static: false }) galleryTrack?: ElementRef<HTMLDivElement>;
  @ViewChild('autoTrack', { static: false }) autoTrack?: ElementRef<HTMLDivElement>;

  private autoTrackTimer?: ReturnType<typeof setInterval>;
  selectedLocation: 'ALL' | 'NEW YORK' | 'COPENHAGEN' | 'DUBAI' = 'ALL';

  readonly contactSlides: CatalogContactSlide[] = [
    {
      image: 'assets/apztattoo/contact/whatsaooPhoto.jpg',
      title: 'WhatsApp',
      info: 'Quick answers for idea validation, date blocks and travel planning.',
      href: 'https://wa.me/19297202028',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'Chat on WhatsApp',
      platform: 'whatsapp'
    },
    {
      image: 'assets/apztattoo/contact/emailPhoto.jpg',
      title: 'Email',
      info: 'Send references, body photos and project details in one place.',
      href: 'mailto:info@apztattoo.com?subject=Catalog%20Inquiry',
      target: '_self',
      rel: '',
      ctaLabel: 'Send Email',
      platform: 'email'
    },
    {
      image: 'assets/apztattoo/contact/instagramPhoto.jpg',
      title: 'Instagram',
      info: 'DM @apztattoo to discuss design direction and booking windows.',
      href: 'https://www.instagram.com/apztattoo',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'DM on Instagram',
      platform: 'instagram'
    },
    {
      image: 'assets/apztattoo/contact/mesengerPhoto.jpg',
      title: 'Messenger',
      info: 'Prefer Facebook? Reach the team through Messenger directly.',
      href: 'https://m.me/apztattoo',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'Message on Messenger',
      platform: 'messenger'
    },
    {
      image: 'assets/apztattoo/contact/callPhoto.jpg',
      title: 'Call',
      info: 'Talk live with the studio to align time blocks and logistics.',
      href: 'tel:+19297202028',
      target: '_self',
      rel: '',
      ctaLabel: 'Call Us',
      platform: 'call'
    }
  ];

  readonly catalogCards: CatalogRateCard[] = [
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_08.png',
      title: 'Day Session',
      priceRange: '$1,450 - $2,900',
      copy: 'Full-day execution for focused pieces and high-detail sessions.',
      href: '/connect',
      location: 'NEW YORK',
      studio: 'Noble Art Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_09.jpg',
      title: 'Inner Upper Arm',
      priceRange: '$1,450 - $2,175',
      copy: 'Bicep-oriented projects with strong flow and visibility balance.',
      href: '/connect',
      location: 'COPENHAGEN',
      studio: 'Dropout Collective'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_10.png',
      title: 'Outer Forearm',
      priceRange: '$2,900',
      copy: 'High impact placement for structured realism compositions.',
      href: '/connect',
      location: 'DUBAI',
      studio: 'Dubai Hills Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_11.jpg',
      title: 'Inner Forearm',
      priceRange: '$2,900',
      copy: 'Readable storytelling pieces with close-up detail.',
      href: '/connect',
      location: 'NEW YORK',
      studio: 'Noble Art Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_12.jpg',
      title: 'Hand',
      priceRange: '$1,450 - $2,175',
      copy: 'Compact designs for strong visual identity in small scale.',
      href: '/connect',
      location: 'COPENHAGEN',
      studio: 'Dropout Collective'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_13.png',
      title: 'Chest',
      priceRange: '$4,350 - $7,250',
      copy: 'Large format projects where anatomy and symmetry are key.',
      href: '/connect',
      location: 'DUBAI',
      studio: 'Dubai Hills Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_14.png',
      title: 'Outer Thigh',
      priceRange: '$4,350 - $8,700',
      copy: 'Complex projects with room for layered narrative scenes.',
      href: '/connect',
      location: 'NEW YORK',
      studio: 'Noble Art Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_15.png',
      title: 'Inner Thigh',
      priceRange: '$2,900 - $7,250',
      copy: 'Flexible area for progressive work in multiple sessions.',
      href: '/connect',
      location: 'COPENHAGEN',
      studio: 'Dropout Collective'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_16.png',
      title: 'Neck',
      priceRange: '$1,450 - $4,350',
      copy: 'Bold statement placement, planned for proportion and readability.',
      href: '/connect',
      location: 'DUBAI',
      studio: 'Dubai Hills Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_17.png',
      title: 'Full Back',
      priceRange: '$4,350 - $21,750',
      copy: 'Large-scale master projects built in phases with session blocks.',
      href: '/connect',
      location: 'NEW YORK',
      studio: 'Noble Art Tattoo'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_18.png',
      title: 'Outer Calf - Tibia',
      priceRange: '$2,900 - $5,800',
      copy: 'Vertical compositions designed for movement and leg contour.',
      href: '/connect',
      location: 'COPENHAGEN',
      studio: 'Dropout Collective'
    },
    {
      image: 'assets/apztattoo/catalog/catalog_gallery_19.png',
      title: 'Pectoral',
      priceRange: '$1,450 - $2,900',
      copy: 'Controlled contrast and structure for front torso placements.',
      href: '/connect',
      location: 'DUBAI',
      studio: 'Dubai Hills Tattoo'
    }
  ];

  readonly movingCarouselImages: string[] = [
    'assets/apztattoo/catalog/catalog_gallery_20.png',
    'assets/apztattoo/catalog/catalog_gallery_21.png',
    'assets/apztattoo/catalog/catalog_gallery_22.jpg',
    'assets/apztattoo/catalog/catalog_gallery_23.png',
    'assets/apztattoo/catalog/catalog_gallery_24.png',
    'assets/apztattoo/catalog/catalog_gallery_25.png',
    'assets/apztattoo/catalog/catalog_gallery_26.png',
    'assets/apztattoo/catalog/catalog_gallery_27.jpg',
    'assets/apztattoo/catalog/catalog_gallery_28.png',
    'assets/apztattoo/catalog/catalog_gallery_29.jpg',
    'assets/apztattoo/catalog/catalog_gallery_30.png',
    'assets/apztattoo/catalog/catalog_gallery_31.jpg',
    'assets/apztattoo/catalog/catalog_gallery_32.png',
    'assets/apztattoo/catalog/catalog_gallery_33.png',
    'assets/apztattoo/catalog/catalog_gallery_34.png',
    'assets/apztattoo/catalog/catalog_gallery_35.png',
    'assets/apztattoo/catalog/catalog_gallery_36.png',
    'assets/apztattoo/catalog/catalog_gallery_37.jpg',
    'assets/apztattoo/catalog/catalog_gallery_38.png',
    'assets/apztattoo/catalog/catalog_gallery_39.png',
    'assets/apztattoo/catalog/catalog_gallery_40.png',
    'assets/apztattoo/catalog/catalog_gallery_41.png',
    'assets/apztattoo/catalog/catalog_gallery_42.png',
    'assets/apztattoo/catalog/catalog_gallery_43.jpg',
    'assets/apztattoo/catalog/catalog_gallery_44.png',
    'assets/apztattoo/catalog/catalog_gallery_45.png',
    'assets/apztattoo/catalog/catalog_gallery_46.png',
    'assets/apztattoo/catalog/catalog_gallery_47.png',
    'assets/apztattoo/catalog/catalog_gallery_48.png',
    'assets/apztattoo/catalog/catalog_gallery_49.jpg'
  ];

  readonly movingCarouselLoopImages: string[] = [...this.movingCarouselImages, ...this.movingCarouselImages];

  get filteredCatalogCards(): CatalogRateCard[] {
    if (this.selectedLocation === 'ALL') return this.catalogCards;
    return this.catalogCards.filter((card) => card.location === this.selectedLocation);
  }

  constructor(
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Catalog | Apz Tattoo Artist',
      description:
        'APZ catalog with session ranges, placement references and direct booking channels for New York, Copenhagen and Dubai.'
    });
    this.headerTheme.setTransparentTheme();
  }

  ngAfterViewInit(): void {
    this.resumeAutoCarousel();
  }

  ngOnDestroy(): void {
    this.stopAutoCarousel();
    this.headerTheme.setDarkTheme();
  }

  setLocation(location: 'ALL' | 'NEW YORK' | 'COPENHAGEN' | 'DUBAI'): void {
    this.selectedLocation = location;
  }

  scrollNext(): void {
    this.scrollGallery(1);
  }

  scrollPrevious(): void {
    this.scrollGallery(-1);
  }

  private scrollGallery(direction: 1 | -1): void {
    const track = this.galleryTrack?.nativeElement;
    if (!track) return;
    const amount = this.getCardScrollAmount(track, '.gallery-item');
    this.animateScroll(track, track.scrollLeft + amount * direction, 700);
  }

  pauseAutoCarousel(): void {
    this.stopAutoCarousel();
  }

  resumeAutoCarousel(): void {
    this.stopAutoCarousel();
    this.autoTrackTimer = setInterval(() => {
      const track = this.autoTrack?.nativeElement;
      if (!track) return;

      track.scrollLeft += 1;
      const resetPoint = track.scrollWidth / 2;
      if (track.scrollLeft >= resetPoint) {
        track.scrollLeft = 0;
      }
    }, 18);
  }

  private stopAutoCarousel(): void {
    if (!this.autoTrackTimer) return;
    clearInterval(this.autoTrackTimer);
    this.autoTrackTimer = undefined;
  }

  private getCardScrollAmount(track: HTMLElement, itemSelector: string): number {
    const child = track.querySelector(itemSelector) as HTMLElement | null;
    if (!child) return 320;
    const style = window.getComputedStyle(child);
    const marginRight = parseFloat(style.marginRight || '12') || 12;
    return Math.round(child.offsetWidth + marginRight);
  }

  private animateScroll(element: HTMLElement, to: number, duration = 700): void {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const easeInOut = (t: number) => 0.5 * (1 - Math.cos(Math.PI * t));

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      element.scrollLeft = Math.round(start + change * easeInOut(t));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
