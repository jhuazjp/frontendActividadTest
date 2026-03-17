import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type HeaderTheme = 'dark' | 'light' | 'custom';

export interface HeaderStyle {
  theme: HeaderTheme;
  backgroundColor?: string;
  scrolledBackgroundColor?: string;
  textColor?: string;
  mutedColor?: string;
  borderColor?: string;
  accentColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderThemeService {
  private readonly defaultStyle: HeaderStyle = {
    theme: 'dark',
    backgroundColor: 'rgba(8, 8, 8, 0.92)',
    scrolledBackgroundColor: 'rgba(8, 8, 8, 0.92)',
    textColor: 'var(--color-text)',
    mutedColor: 'var(--color-muted)',
    borderColor: 'var(--color-line)',
    accentColor: 'var(--color-accent)'
  };

  private readonly initialStyle: HeaderStyle = {
    theme: 'custom',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    scrolledBackgroundColor: 'rgba(8, 8, 8, 0.42)',
    textColor: '#ffffff',
    mutedColor: '#e9e9e9',
    borderColor: 'rgba(255, 255, 255, 0)',
    accentColor: '#ffffff'
  };

  private readonly styleSubject = new BehaviorSubject<HeaderStyle>(this.initialStyle);
  public readonly style$ = this.styleSubject.asObservable();

  setTheme(style: Partial<HeaderStyle>): void {
    const current = this.styleSubject.value;
    this.styleSubject.next({ ...current, ...style });
  }

  resetTheme(): void {
    this.styleSubject.next(this.defaultStyle);
  }

  // Temas preconfigurados para diferentes tipos de fondos
  setImageBackgroundTheme(imageOpacity: number): void {
    // Cuando hay imagen de fondo visible, hacer el header más oscuro para contraste
    const isDark = imageOpacity > 0.4;
    this.setTheme({
      theme: isDark ? 'dark' : 'light',
      backgroundColor: isDark ? 'rgba(5, 5, 5, 0.95)' : 'rgba(242, 242, 240, 0.94)',
      scrolledBackgroundColor: isDark ? 'rgba(5, 5, 5, 0.95)' : 'rgba(242, 242, 240, 0.94)',
      textColor: isDark ? 'var(--color-text)' : 'rgb(36, 34, 34)',
      mutedColor: isDark ? 'var(--color-muted)' : 'rgb(146, 145, 145)',
      borderColor: isDark ? 'var(--color-line)' : 'rgb(200, 200, 200)',
      accentColor: isDark ? 'var(--color-accent)' : 'rgb(36, 34, 34)'
    });
  }

  setLightTheme(): void {
    this.setTheme({
      theme: 'light',
      backgroundColor: 'rgba(242, 242, 240, 0.94)',
      scrolledBackgroundColor: 'rgba(242, 242, 240, 0.94)',
      textColor: 'rgb(36, 34, 34)',
      mutedColor: 'rgb(146, 145, 145)',
      borderColor: 'rgb(200, 200, 200)',
      accentColor: 'rgb(36, 34, 34)'
    });
  }

  setTransparentTheme(scrolledBackgroundColor = 'rgba(8, 8, 8, 0.42)'): void {
    this.setTheme({
      theme: 'custom',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      scrolledBackgroundColor,
      textColor: '#ffffff',
      mutedColor: '#e9e9e9',
      borderColor: 'rgba(255, 255, 255, 0)',
      accentColor: '#ffffff'
    });
  }

  setDarkTheme(): void {
    this.resetTheme();
  }
}
