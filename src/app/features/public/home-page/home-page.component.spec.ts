import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { SeoService } from '../../../core/services/seo.service';
import { HeaderThemeService } from '../../../core/services/header-theme.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let seoService: jasmine.SpyObj<SeoService>;
  let headerThemeService: jasmine.SpyObj<HeaderThemeService>;
  let scrollSpy: jasmine.Spy;

  beforeEach(async () => {
    seoService = jasmine.createSpyObj<SeoService>('SeoService', ['update']);
    headerThemeService = jasmine.createSpyObj<HeaderThemeService>('HeaderThemeService', [
      'setTransparentTheme',
      'setDarkTheme'
    ]);
    scrollSpy = spyOn(window, 'scrollTo');

    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        { provide: SeoService, useValue: seoService },
        { provide: HeaderThemeService, useValue: headerThemeService }
      ]
    })
      .overrideComponent(HomePageComponent, {
        set: {
          template: '<section class="home-page-test"></section>'
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    document.body.classList.remove('home-route');
  });

  it('should create the home page', () => {
    expect(component).toBeTruthy();
  });

  it('should configure seo, theme and initial scroll on init', () => {
    fixture.detectChanges();

    expect(seoService.update).toHaveBeenCalled();
    expect(headerThemeService.setTransparentTheme).toHaveBeenCalled();
    expect(scrollSpy).toHaveBeenCalled();
    expect(scrollSpy.calls.mostRecent().args[0]).toEqual({ top: 0, left: 0, behavior: 'auto' });
    expect(document.body.classList.contains('home-route')).toBeTrue();
  });

  it('should move between kind words', () => {
    expect(component.activeKindWord.author).toBe('DALTON BOYT');

    component.nextKindWord();
    expect(component.activeKindWord.author).toBe('MELANI REYES');

    component.previousKindWord();
    expect(component.activeKindWord.author).toBe('DALTON BOYT');
  });

  it('should restore the header theme on destroy', () => {
    fixture.detectChanges();
    fixture.destroy();

    expect(headerThemeService.setDarkTheme).toHaveBeenCalled();
    expect(document.body.classList.contains('home-route')).toBeFalse();
  });
});
