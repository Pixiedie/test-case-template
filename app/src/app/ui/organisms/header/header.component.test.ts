import { fireEvent, renderForSnap, renderWithProviders, screen } from '@testing/render';
import { HeaderComponent } from './header.component';

describe('src/app/ui/organisms/header/header.component', () => {
  it('When rendered then shows the Simplis brand', async () => {
    await renderWithProviders(HeaderComponent, { inputs: { isLight: true }, withRouter: true });

    expect(screen.getByText('Simplis')).toBeTruthy();
  });

  it('When rendered then the brand links to the home page', async () => {
    await renderWithProviders(HeaderComponent, { inputs: { isLight: true }, withRouter: true });

    expect(screen.getByText('Simplis').getAttribute('href')).toBe('/');
  });

  it('When isLight is false then forwards it to the toggle', async () => {
    await renderWithProviders(HeaderComponent, { inputs: { isLight: false }, withRouter: true });

    expect(screen.getByRole('button').getAttribute('aria-label')).toBe('Passer en mode clair');
  });

  it('When the toggle emits then the header re-emits themeToggle', async () => {
    const onToggle = jest.fn();

    await renderWithProviders(HeaderComponent, {
      inputs: { isLight: true },
      on: { themeToggle: onToggle },
      withRouter: true,
    });

    fireEvent.click(screen.getByRole('button'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('When rendered then matches the snapshot', async () => {
    const container = await renderForSnap(HeaderComponent, {
      inputs: { isLight: true },
      withRouter: true,
    });

    expect(container).toMatchSnapshot();
  });
});
