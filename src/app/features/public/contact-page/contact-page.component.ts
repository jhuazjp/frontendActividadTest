import { Component, OnDestroy, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendApiService } from '../../../core/services/backend-api.service';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';
import { AssetUrlPipe } from '../../../shared/pipes/asset-url.pipe';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AssetUrlPipe],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {
  // reference to the horizontal gallery track
  @ViewChild('galleryTrack', { static: false }) galleryTrack?: ElementRef<HTMLDivElement>;
  private readonly fb = inject(FormBuilder);

  readonly contactMethods: Array<{
    image: string;
    title: string;
    info: string;
    href: string;
    target: string;
    rel: string;
    ctaLabel: string;
  }> = [
    {
      image: 'assets/apztattoo/contact/whatsaooPhoto.jpg',
      title: 'WhatsApp',
      info: 'Chat with us on WhatsApp to discuss your tattoo project and get quick responses.',
      href: 'https://wa.me/19297202028',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'Chat on WhatsApp'
    },
    {
      image: 'assets/apztattoo/contact/emailPhoto.jpg',
      title: 'Email',
      info: 'Send us an email with your project details and we will get back to you shortly.',
      href: 'mailto:info@apztattoo.com?subject=Tattoo%20Project',
      target: '_self',
      rel: '',
      ctaLabel: 'Send Email'
    },
    {
      image: 'assets/apztattoo/contact/callPhoto.jpg',
      title: 'Call',
      info: 'Reach us by phone to schedule a consultation and discuss your design ideas.',
      href: 'tel:+19297202028',
      target: '_self',
      rel: '',
      ctaLabel: 'Call Us'
    },
    {
      image: 'assets/apztattoo/contact/mesengerPhoto.jpg',
      title: 'Messenger',
      info: 'Connect with us via Facebook Messenger for quick and easy communication.',
      href: 'https://m.me/apztattoo',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'Message on Messenger'
    },
    {
      image: 'assets/apztattoo/contact/instagramPhoto.jpg',
      title: 'Instagram',
      info: 'Reach out via Instagram DM @apztattoo for portfolio and quick replies.',
      href: 'https://www.instagram.com/apztattoo',
      target: '_blank',
      rel: 'noopener noreferrer',
      ctaLabel: 'DM on Instagram'
    }
  ];

  loading = false;
  message = '';

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: [''],
    city: [''],
    instagramHandle: [''],
    termsAccepted: [false, [Validators.requiredTrue]],
    contactConsent: [false, [Validators.requiredTrue]]
  });

  constructor(
    private readonly api: BackendApiService,
    private readonly seo: SeoService,
    private readonly headerTheme: HeaderThemeService
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact | Apz Tattoo Artist',
      description:
        'Apz specializes in unique tattoos reflecting your personality. Contact in-store, video call, or live chat.'
    });
    this.headerTheme.setDarkTheme();
  }

  ngOnDestroy(): void {
    this.headerTheme.setDarkTheme();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    if (!values.email && !values.phone) {
      this.message = 'Email or phone is required for contact.';
      return;
    }

    this.loading = true;
    this.message = '';

    this.api.submitPublicContact(values).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Inquiry sent. Our CRM team will contact you shortly.';
        this.form.reset({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          instagramHandle: '',
          termsAccepted: false,
          contactConsent: false
        });
      },
      error: () => {
        this.loading = false;
        this.message = 'Could not send inquiry. Please try again.';
      }
    });
  }

  private getCardScrollAmount(): number {
    const track = this.galleryTrack?.nativeElement;
    if (!track) return 320;
    const child = track.querySelector('.gallery-item') as HTMLElement | null;
    if (!child) return 320;
    const style = window.getComputedStyle(child);
    const marginRight = parseFloat(style.marginRight || '12') || 12;
    return Math.round(child.offsetWidth + marginRight);
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
    const amount = this.getCardScrollAmount();
    this.animateScroll(track, track.scrollLeft + amount * direction, 700);
  }

  private animateScroll(element: HTMLElement, to: number, duration = 700): void {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const easeInOut = (t: number) => {
      return 0.5 * (1 - Math.cos(Math.PI * t));
    };

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOut(t);
      element.scrollLeft = Math.round(start + change * eased);
      if (t < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
