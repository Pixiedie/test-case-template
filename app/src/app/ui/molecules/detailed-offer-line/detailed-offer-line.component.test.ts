import { renderWithProviders, screen } from '@testing/render';
import { DetailedOfferLineComponent } from './detailed-offer-line.component';

describe('src/app/ui/molecules/detailed-offer-line/detailed-offer-line.component', () => {
  it('When a label and a value are provided then renders both', async () => {
    await renderWithProviders(DetailedOfferLineComponent, {
      inputs: { label: 'Activité pro', value: 'Conseil en informatique' },
    });

    expect(screen.getByText('Activité pro')).toBeTruthy();
    expect(screen.getByText('Conseil en informatique')).toBeTruthy();
  });

  it('When divider is true then applies the divider modifier class', async () => {
    const { fixture } = await renderWithProviders(DetailedOfferLineComponent, {
      inputs: { label: 'Localisation', value: 'Paris (75)', divider: true },
    });

    expect(
      (fixture.nativeElement as HTMLElement).classList.contains('detailed-offer-line--divider')
    ).toBe(true);
  });

  it('When divider is not set then does not apply the divider modifier class', async () => {
    const { fixture } = await renderWithProviders(DetailedOfferLineComponent, {
      inputs: { label: 'Localisation', value: 'Paris (75)' },
    });

    expect(
      (fixture.nativeElement as HTMLElement).classList.contains('detailed-offer-line--divider')
    ).toBe(false);
  });
});
