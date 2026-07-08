import { render } from '@testing/render';
import { ButtonComponent } from './button.component';

describe('src/app/ui/atoms/button/button.component', () => {
  it('When rendered then projects its content into the button', async () => {
    const { container } = await render(`<button app-button>Voir l'offre</button>`, {
      imports: [ButtonComponent],
    });

    expect(container.querySelector('button')?.textContent).toContain("Voir l'offre");
  });

  it('When the primary variant is used then applies the primary modifier class', async () => {
    const { container } = await render(`<button app-button [variant]="'primary'">Voir l'offre</button>`, {
      imports: [ButtonComponent],
    });

    expect(container.querySelector('button')?.classList.contains('button--primary')).toBe(true);
  });
});
