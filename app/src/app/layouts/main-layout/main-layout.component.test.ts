import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { MainLayoutComponent } from './main-layout.component';

describe('src/app/layouts/main-layout/main-layout.component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('When rendered then shows the header brand', async () => {
    await renderWithProviders(MainLayoutComponent, { withRouter: true });

    expect(screen.getByText('Simplis')).toBeTruthy();
  });

  it('When the toggle is clicked then switches the theme', async () => {
    await renderWithProviders(MainLayoutComponent, { withRouter: true });

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Passer en mode sombre');

    fireEvent.click(button);

    expect(button.getAttribute('aria-label')).toBe('Passer en mode clair');
  });
});
