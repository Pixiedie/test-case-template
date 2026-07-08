import { renderWithProviders, screen } from '@testing/render';
import { LabelComponent } from './label.component';

describe('src/app/ui/atoms/label/label.component', () => {
  it('When text is provided then renders it', async () => {
    await renderWithProviders(LabelComponent, { inputs: { text: 'Activité' } });

    expect(screen.getByText('Activité')).toBeTruthy();
  });

  it('When htmlFor is provided then sets the for attribute', async () => {
    const { container } = await renderWithProviders(LabelComponent, {
      inputs: { text: 'Activité', htmlFor: 'activity' },
    });

    expect(container.querySelector('label')?.getAttribute('for')).toBe('activity');
  });

  it('When required is true then shows an asterisk', async () => {
    await renderWithProviders(LabelComponent, {
      inputs: { text: 'Activité', required: true },
    });

    expect(screen.getByText('*')).toBeTruthy();
  });

  it('When required is false then hides the asterisk', async () => {
    await renderWithProviders(LabelComponent, {
      inputs: { text: 'Activité', required: false },
    });

    expect(screen.queryByText('*')).toBeNull();
  });
});
