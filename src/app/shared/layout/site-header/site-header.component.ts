import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderThemeService, HeaderStyle } from '../../../core/services/header-theme.service';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  currentStyle: HeaderStyle | null = null;
  isScrolled = false;
  private readonly scrollThreshold = 24;

  private destroy$ = new Subject<void>();

  constructor(
    public readonly auth: AuthService,
    private readonly themeService: HeaderThemeService,
    private readonly router: Router,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > this.scrollThreshold;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateHeaderHeightVar();
  }

  @HostListener('window:load')
  onWindowLoad(): void {
    this.updateHeaderHeightVar();
  }

  ngOnInit(): void {
    this.onWindowScroll();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        requestAnimationFrame(() => {
          this.onWindowScroll();
          this.updateHeaderHeightVar();
        });
      });

    this.themeService.style$
      .pipe(takeUntil(this.destroy$))
      .subscribe((style) => {
        this.currentStyle = style;
        requestAnimationFrame(() => this.updateHeaderHeightVar());
      });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.updateHeaderHeightVar());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateHeaderHeightVar(): void {
    const header = this.elementRef.nativeElement.querySelector('.site-header') as HTMLElement | null;
    if (!header) return;
    const height = Math.round(header.getBoundingClientRect().height);
    if (height > 0) {
      document.documentElement.style.setProperty('--site-header-height', `${height}px`);
    }
  }

  get headerBackground(): string {
    return this.currentStyle?.backgroundColor ?? 'rgba(8, 8, 8, 0.92)';
  }

  get headerBackgroundScrolled(): string {
    if (this.currentStyle?.scrolledBackgroundColor) {
      return this.currentStyle.scrolledBackgroundColor;
    }
    if (this.currentStyle?.theme === 'custom') {
      return 'rgba(8, 8, 8, 0.42)';
    }
    return this.currentStyle?.backgroundColor ?? 'rgba(8, 8, 8, 0.92)';
  }

  get headerTextColor(): string {
    return this.currentStyle?.textColor ?? 'var(--color-text)';
  }

  get headerMutedColor(): string {
    return this.currentStyle?.mutedColor ?? 'var(--color-muted)';
  }

  get headerBorderColor(): string {
    return this.currentStyle?.borderColor ?? 'var(--color-line)';
  }

  get headerAccentColor(): string {
    return this.currentStyle?.accentColor ?? 'var(--color-accent)';
  }

  dashboardUrl(roles: string[]): string {
    if (roles.includes('ADMIN')) return '/admin';
    return '/';
  }

  logout(): void {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
