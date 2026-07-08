import { render, screen } from '@testing/render';
import { FormContainerComponent } from './form-container.component';

describe('src/app/ui/atoms/form-container/form-container.component', () => {
  it('When content is projected then renders it', async () => {
    await render(
      '<form app-form-container><span>First field</span><span>Second field</span></form>',
      {
        imports: [FormContainerComponent],
      }
    );

    expect(screen.getByText('First field')).toBeTruthy();
    expect(screen.getByText('Second field')).toBeTruthy();
  });
});
