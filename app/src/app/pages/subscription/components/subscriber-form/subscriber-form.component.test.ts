import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { SubscriberFormComponent } from './subscriber-form.component';

const renderComponent = (on: Record<string, unknown> = {}) =>
  renderWithProviders(SubscriberFormComponent, {
    inputs: { submitLabel: 'Souscrire' },
    on,
  });

const fillField = (container: HTMLElement, id: string, value: string): void => {
  const input = container.querySelector(`#${id}`) as HTMLInputElement;
  fireEvent.input(input, { target: { value } });
};

const fillValidForm = (container: HTMLElement): void => {
  fillField(container, 'firstName', 'Jean');
  fillField(container, 'lastName', 'Dupont');
  fillField(container, 'email', 'jean@dupont.fr');
  fillField(container, 'phone', '06 12 34 56 78');
  fillField(container, 'address', '1 rue de Paris');
};

describe('src/app/pages/subscription/components/subscriber-form/subscriber-form.component', () => {
  it('When rendered then shows every field and the submit label', async () => {
    await renderComponent();

    expect(screen.getByText('Prénom')).toBeTruthy();
    expect(screen.getByText('Nom')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Téléphone')).toBeTruthy();
    expect(screen.getByText('Adresse postale')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Souscrire' })).toBeTruthy();
  });

  it('When the form is empty then the submit button is disabled', async () => {
    await renderComponent();

    const submit = screen.getByRole('button', { name: 'Souscrire' }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
  });

  it('When the email is invalid and touched then shows the email error', async () => {
    const { container } = await renderComponent();

    const email = container.querySelector('#email') as HTMLInputElement;
    fireEvent.input(email, { target: { value: 'not-an-email' } });
    fireEvent.blur(email);

    expect(screen.getByText('Adresse email invalide')).toBeTruthy();
  });

  it('When the phone is invalid and touched then shows the custom phone error', async () => {
    const { container } = await renderComponent();

    const phone = container.querySelector('#phone') as HTMLInputElement;
    fireEvent.input(phone, { target: { value: 'abc' } });
    fireEvent.blur(phone);

    expect(screen.getByText('Numéro de téléphone invalide')).toBeTruthy();
  });

  it('When the form is valid and submitted then emits formSubmit with the values', async () => {
    const onSubmit = jest.fn();
    const { container } = await renderComponent({ formSubmit: onSubmit });

    fillValidForm(container);
    fireEvent.click(screen.getByRole('button', { name: 'Souscrire' }));

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@dupont.fr',
      phone: '06 12 34 56 78',
      address: '1 rue de Paris',
    });
  });
});
