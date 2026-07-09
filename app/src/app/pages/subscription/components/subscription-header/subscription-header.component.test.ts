import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { SubscriptionHeaderComponent } from './subscription-header.component';

const renderComponent = (inputs: Record<string, unknown> = {}, on: Record<string, unknown> = {}) =>
  renderWithProviders(SubscriptionHeaderComponent, {
    inputs: {
      currentStep: 2,
      totalSteps: 4,
      title: 'Composez votre couverture',
      subtitle: 'Sélectionnez les garanties adaptées à votre activité.',
      ...inputs,
    },
    on,
  });

describe('src/app/pages/subscription/components/subscription-header/subscription-header.component', () => {
  it('When rendered then shows the title, subtitle and step counter', async () => {
    await renderComponent();

    expect(screen.getByText('Composez votre couverture')).toBeTruthy();
    expect(screen.getByText('Sélectionnez les garanties adaptées à votre activité.')).toBeTruthy();
    expect(screen.getByText('Étape 2 / 4')).toBeTruthy();
  });

  it('When rendered then shows the progress bar reflecting the current step', async () => {
    const { container } = await renderComponent();

    const bar = container.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute('aria-valuenow')).toBe('2');
    expect(bar?.getAttribute('aria-valuemax')).toBe('4');
  });

  it('When no subtitle is provided then does not render the subtitle', async () => {
    const { container } = await renderComponent({ subtitle: '' });

    expect(container.querySelector('.subscription-header__subtitle')).toBeNull();
  });

  it('When a backLabel is provided then shows the back button', async () => {
    await renderComponent({ backLabel: 'Entreprise' });

    expect(screen.getByRole('button', { name: /Entreprise/ })).toBeTruthy();
  });

  it('When no backLabel is provided then does not show the back button', async () => {
    const { container } = await renderComponent({ backLabel: '' });

    expect(container.querySelector('.subscription-header__back')).toBeNull();
  });

  it('When the back button is clicked then emits back', async () => {
    const onBack = jest.fn();
    await renderComponent({ backLabel: 'Entreprise' }, { back: onBack });

    fireEvent.click(screen.getByRole('button', { name: /Entreprise/ }));

    expect(onBack).toHaveBeenCalled();
  });
});
