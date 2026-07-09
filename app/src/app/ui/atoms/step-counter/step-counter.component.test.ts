import { renderWithProviders, screen } from '@testing/render';
import { StepCounterComponent } from './step-counter.component';

describe('src/app/ui/atoms/step-counter/step-counter.component', () => {
  it('When current and total are provided then renders the step label', async () => {
    await renderWithProviders(StepCounterComponent, { inputs: { current: 2, total: 4 } });

    expect(screen.getByText('Étape 2 / 4')).toBeTruthy();
  });
});
