import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { OfferCardComponent } from './offer-card.component';

const baseInputs = {
  tagLabel: 'Conseil en informatique',
  recommended: false,
  title: 'Multirisque Pro Essentiel',
  lines: [{ label: 'Forme juridique', value: 'SASU' }],
  price: 288,
  priceLabel: 'Prime annuelle',
  pricePeriod: '/an',
  ctaLabel: "Voir l'offre",
};

describe('src/app/ui/organisms/offer-card/offer-card.component', () => {
  it('When rendered then shows the title, tag, lines, price and CTA', async () => {
    await renderWithProviders(OfferCardComponent, { inputs: baseInputs });

    expect(screen.getByText('Multirisque Pro Essentiel')).toBeTruthy();
    expect(screen.getByText('Conseil en informatique')).toBeTruthy();
    expect(screen.getByText('SASU')).toBeTruthy();
    expect(screen.getByText(/288/)).toBeTruthy();
    expect(screen.getByText("Voir l'offre")).toBeTruthy();
  });

  it('When recommended then shows the "Recommandé" tag', async () => {
    await renderWithProviders(OfferCardComponent, {
      inputs: { ...baseInputs, recommended: true },
    });

    expect(screen.getByText('Recommandé')).toBeTruthy();
  });

  it('When not recommended then does not show the "Recommandé" tag', async () => {
    await renderWithProviders(OfferCardComponent, {
      inputs: { ...baseInputs, recommended: false },
    });

    expect(screen.queryByText('Recommandé')).toBeNull();
  });

  it('When the CTA is clicked then emits offerSelect', async () => {
    const onSelect = jest.fn();
    await renderWithProviders(OfferCardComponent, {
      inputs: baseInputs,
      on: { offerSelect: onSelect },
    });

    fireEvent.click(screen.getByText("Voir l'offre"));

    expect(onSelect).toHaveBeenCalled();
  });
});
