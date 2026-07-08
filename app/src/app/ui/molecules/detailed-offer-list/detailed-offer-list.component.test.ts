import { renderWithProviders, screen } from '@testing/render';
import { DetailedOfferListComponent } from './detailed-offer-list.component';

describe('src/app/ui/molecules/detailed-offer-list/detailed-offer-list.component', () => {
  it('When lines are provided then renders one line per entry', async () => {
    await renderWithProviders(DetailedOfferListComponent, {
      inputs: {
        lines: [
          { label: 'Activité pro', value: 'Conseil en informatique' },
          { label: 'Forme juridique', value: 'SASU' },
        ],
      },
    });

    expect(screen.getByText('Activité pro')).toBeTruthy();
    expect(screen.getByText('Conseil en informatique')).toBeTruthy();
    expect(screen.getByText('Forme juridique')).toBeTruthy();
    expect(screen.getByText('SASU')).toBeTruthy();
  });
});
