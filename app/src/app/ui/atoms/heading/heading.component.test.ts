import { render } from '@testing/render';
import { HeadingComponent } from './heading.component';

describe('src/app/ui/atoms/heading/heading.component', () => {
  it('When used on an h1 then renders an h1 with its content', async () => {
    const { container } = await render('<h1 app-heading>Titre de page</h1>', {
      imports: [HeadingComponent],
    });

    expect(container.querySelector('h1')?.textContent).toContain('Titre de page');
  });

  it('When used on an h2 then renders an h2 with its content', async () => {
    const { container } = await render('<h2 app-heading>Les meilleures offres</h2>', {
      imports: [HeadingComponent],
    });

    expect(container.querySelector('h2')?.textContent).toContain('Les meilleures offres');
  });

  it('When used on an h3 then renders an h3 with its content', async () => {
    const { container } = await render('<h3 app-heading>Multirisque Pro Essentiel</h3>', {
      imports: [HeadingComponent],
    });

    expect(container.querySelector('h3')?.textContent).toContain('Multirisque Pro Essentiel');
  });
});
