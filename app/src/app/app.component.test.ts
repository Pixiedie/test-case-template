import { renderWithProviders } from '@testing/render';
import { AppComponent } from './app.component';

describe('src/app/app.component', () => {
  it('When the app is rendered then it creates without error', async () => {
    const { fixture } = await renderWithProviders(AppComponent, {
      withRouter: true,
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
