import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('src/app/ui/atoms/theme-toggle/theme-toggle.component', () => {
  it('When isLight is true then shows the moon icon and the "go dark" label', async () => {
    await renderWithProviders(ThemeToggleComponent, {
      inputs: { isLight: true },
    });

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Passer en mode sombre');
    expect(button.textContent).toContain('🌙');
  });

  it('When isLight is false then shows the sun icon and the "go light" label', async () => {
    await renderWithProviders(ThemeToggleComponent, {
      inputs: { isLight: false },
    });

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Passer en mode clair');
    expect(button.textContent).toContain('☀️');
  });

  it('When the button is clicked then emits themeToggle', async () => {
    const onToggle = jest.fn();

    await renderWithProviders(ThemeToggleComponent, {
      inputs: { isLight: true },
      on: { themeToggle: onToggle },
    });

    fireEvent.click(screen.getByRole('button'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
