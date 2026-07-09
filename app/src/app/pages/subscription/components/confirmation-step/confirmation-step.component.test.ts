import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import { renderWithProviders, screen } from '@testing/render';
import { ConfirmationStepComponent } from './confirmation-step.component';

const offer: OfferCardProps = {
  tagLabel: 'AXA',
  recommended: false,
  title: 'Rainboots',
  lines: [],
  price: 277.2,
  priceLabel: 'Prime annuelle',
  pricePeriod: '/an',
  ctaLabel: 'Souscrire',
};

describe('src/app/pages/subscription/components/confirmation-step/confirmation-step.component', () => {
  it('When advisor then shows the callback message', async () => {
    await renderWithProviders(ConfirmationStepComponent, {
      inputs: { isAdvisor: true, offer: null },
    });

    expect(screen.getByText('Un conseiller vous recontactera dans les plus brefs délais.')).toBeTruthy();
  });

  it('When subscription then shows the payment recap and demo note', async () => {
    await renderWithProviders(ConfirmationStepComponent, {
      inputs: { isAdvisor: false, offer },
    });

    expect(screen.getByText('Rainboots')).toBeTruthy();
    expect(
      screen.getByText("L'étape de paiement n'est pas implémentée dans cette démo.")
    ).toBeTruthy();
  });
});
