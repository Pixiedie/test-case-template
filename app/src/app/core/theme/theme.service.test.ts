import { injectService } from '@testing/render';
import { ThemeService } from './theme.service';

describe('src/app/core/theme/theme.service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('When no preference is stored then defaults to light', () => {
    const service = injectService(ThemeService);

    expect(service.theme()).toBe('light');
    expect(service.isLight()).toBe(true);
  });

  it('When toggle is called then flips the theme', () => {
    const service = injectService(ThemeService);

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(service.isLight()).toBe(false);
  });

  it('When setTheme is called then updates the theme', () => {
    const service = injectService(ThemeService);

    service.setTheme('dark');

    expect(service.theme()).toBe('dark');
  });

  it('When a theme is stored then resolves it on init', () => {
    localStorage.setItem('Simplis-theme', 'dark');

    const service = injectService(ThemeService);

    expect(service.theme()).toBe('dark');
  });
});
