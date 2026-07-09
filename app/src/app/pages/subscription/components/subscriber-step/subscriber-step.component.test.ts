import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import { renderWithProviders, screen } from '@testing/render';
import { SubscriberStepComponent } from './subscriber-step.component';

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

describe('src/app/pages/subscription/components/subscriber-step/subscriber-step.component', () => {
  it('When an offer is provided then shows the recap', async () => {
    await renderWithProviders(SubscriberStepComponent, {
      inputs: { submitLabel: 'Souscrire', offer },
    });

    expect(screen.getByText('Rainboots')).toBeTruthy();
  });

  it('When no offer is provided then does not show the recap', async () => {
    const { container } = await renderWithProviders(SubscriberStepComponent, {
      inputs: { submitLabel: 'Être rappelé', offer: null },
    });

    expect(container.querySelector('.subscriber-step__intro')).toBeNull();
  });

  it('When rendered then forwards the submit label to the form', async () => {
    await renderWithProviders(SubscriberStepComponent, {
      inputs: { submitLabel: 'Être rappelé', offer: null },
    });

    expect(screen.getByRole('button', { name: 'Être rappelé' })).toBeTruthy();
  });
});
