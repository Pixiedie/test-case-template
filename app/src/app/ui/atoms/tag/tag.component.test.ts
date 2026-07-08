import { renderWithProviders, screen } from '@testing/render';
import { TagComponent, TagVariantEnum } from './tag.component';

describe('src/app/ui/atoms/tag/tag.component', () => {
  it('When a label is provided then renders it', async () => {
    await renderWithProviders(TagComponent, {
      inputs: { label: 'Recommandé', variant: TagVariantEnum.PRIMARY },
    });

    expect(screen.getByText('Recommandé')).toBeTruthy();
  });

  it('When the variant is primary then applies the primary modifier class', async () => {
    const { container } = await renderWithProviders(TagComponent, {
      inputs: { label: 'Recommandé', variant: TagVariantEnum.PRIMARY },
    });

    expect(container.querySelector('.tag--primary')).toBeTruthy();
  });

  it('When the variant is secondary then applies the secondary modifier class', async () => {
    const { container } = await renderWithProviders(TagComponent, {
      inputs: { label: 'Conseil en informatique', variant: TagVariantEnum.SECONDARY },
    });

    expect(container.querySelector('.tag--secondary')).toBeTruthy();
  });
});
