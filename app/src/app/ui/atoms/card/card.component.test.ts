import { render, screen } from '@testing/render';
import { CardComponent } from './card.component';

describe('src/app/ui/atoms/card/card.component', () => {
  it('When content is projected then renders it', async () => {
    await render('<app-card>Contenu de la carte</app-card>', {
      imports: [CardComponent],
    });

    expect(screen.getByText('Contenu de la carte')).toBeTruthy();
  });

  it('When the variant is highlighted then applies the highlighted modifier class', async () => {
    const { container } = await render(`<app-card [variant]="'highlighted'">Contenu</app-card>`, {
      imports: [CardComponent],
    });

    expect(container.querySelector('app-card')?.classList.contains('card--highlighted')).toBe(true);
  });
});
