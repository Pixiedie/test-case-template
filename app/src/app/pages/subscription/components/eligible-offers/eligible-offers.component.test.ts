import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { EligibleOffersComponent } from './eligible-offers.component';

const card = (title: string): OfferCardProps => ({
  tagLabel: 'AXA',
  recommended: false,
  title,
  lines: [],
  price: 200,
  priceLabel: 'Prime annuelle',
  pricePeriod: '/an',
  ctaLabel: 'Souscrire',
});

const renderComponent = (inputs: Record<string, unknown> = {}, on: Record<string, unknown> = {}) =>
  renderWithProviders(EligibleOffersComponent, {
    inputs: { bestFitCards: [], upsellCards: [], hasNoOffer: false, ...inputs },
    on,
  });

describe('src/app/pages/subscription/components/eligible-offers/eligible-offers.component', () => {
  it('When there are best-fit and upsell cards then shows both sections', async () => {
    await renderComponent({ bestFitCards: [card('Rainboots')], upsellCards: [card('Raincoat')] });

    expect(screen.getByText('Les meilleures offres')).toBeTruthy();
    expect(screen.getByText('Anticipez votre réussite')).toBeTruthy();
    expect(screen.getByText('Rainboots')).toBeTruthy();
    expect(screen.getByText('Raincoat')).toBeTruthy();
  });

  it('When a card is selected then emits offerSelect with the card', async () => {
    const onSelect = jest.fn();
    await renderComponent({ bestFitCards: [card('Rainboots')] }, { offerSelect: onSelect });

    fireEvent.click(screen.getByRole('button', { name: 'Souscrire' }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ title: 'Rainboots' }));
  });

  it('When there is no offer then shows the advisor fallback and emits requestAdvisor', async () => {
    const onAdvisor = jest.fn();
    await renderComponent({ hasNoOffer: true }, { requestAdvisor: onAdvisor });

    fireEvent.click(screen.getByRole('button', { name: 'Être contacté par un conseiller' }));

    expect(onAdvisor).toHaveBeenCalled();
  });
});
