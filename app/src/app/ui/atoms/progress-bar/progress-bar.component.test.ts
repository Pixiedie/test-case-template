import { renderWithProviders } from '@testing/render';
import { ProgressBarComponent } from './progress-bar.component';

const renderComponent = (value: number, max: number) =>
  renderWithProviders(ProgressBarComponent, { inputs: { value, max } });

const getFill = (container: HTMLElement): HTMLElement =>
  container.querySelector('.progress-bar__fill') as HTMLElement;

describe('src/app/ui/atoms/progress-bar/progress-bar.component', () => {
  it('When value is half of max then the fill width is 50%', async () => {
    const { container } = await renderComponent(2, 4);

    expect(getFill(container).style.width).toBe('50%');
  });

  it('When value exceeds max then the fill width is capped at 100%', async () => {
    const { container } = await renderComponent(5, 4);

    expect(getFill(container).style.width).toBe('100%');
  });

  it('When max is zero then the fill width is 0%', async () => {
    const { container } = await renderComponent(2, 0);

    expect(getFill(container).style.width).toBe('0%');
  });

  it('When rendered then exposes the progressbar aria attributes', async () => {
    const { container } = await renderComponent(2, 4);

    const bar = container.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute('aria-valuenow')).toBe('2');
    expect(bar?.getAttribute('aria-valuemax')).toBe('4');
    expect(bar?.getAttribute('aria-valuemin')).toBe('0');
  });
});
