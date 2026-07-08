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
});
