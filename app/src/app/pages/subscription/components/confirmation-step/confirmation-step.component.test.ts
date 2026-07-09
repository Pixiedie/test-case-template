import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import { renderWithProviders, screen } from '@testing/render';
import type { SubscriberInfoType } from '../subscriber-form/subscriber-form.component';
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

const subscriber: SubscriberInfoType = {
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  phone: '0601020304',
  address: '1 rue de la Paix, Paris',
};

describe('src/app/pages/subscription/components/confirmation-step/confirmation-step.component', () => {
  it('When an offer is selected then shows it as a recap line', async () => {
    await renderWithProviders(ConfirmationStepComponent, {
      inputs: { offer, subscriber },
    });

    expect(screen.getByText('Rainboots')).toBeTruthy();
    expect(screen.getByText('Prime annuelle')).toBeTruthy();
  });

  it('When subscriber info is provided then shows each field as a recap line', async () => {
    await renderWithProviders(ConfirmationStepComponent, {
      inputs: { offer: null, subscriber },
    });

    expect(screen.getByText('Jean Dupont')).toBeTruthy();
    expect(screen.getByText('jean.dupont@example.com')).toBeTruthy();
    expect(screen.getByText('0601020304')).toBeTruthy();
    expect(screen.getByText('1 rue de la Paix, Paris')).toBeTruthy();
  });

  it('When no offer is provided then shows no offer line', async () => {
    await renderWithProviders(ConfirmationStepComponent, {
      inputs: { offer: null, subscriber },
    });

    expect(screen.queryByText('Rainboots')).toBeNull();
  });
});
