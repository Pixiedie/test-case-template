import { FormControl, Validators } from '@angular/forms';
import { InputTypeEnum } from '@ui/atoms/input/input.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { InputFormComponent } from './input-form.component';

const renderComponent = (
  control = new FormControl<string>('', { nonNullable: true }),
  inputs: Record<string, unknown> = {}
) =>
  renderWithProviders(InputFormComponent, {
    inputs: {
      label: 'Adresse email',
      name: 'email',
      control,
      placeholder: 'Votre email',
      ...inputs,
    },
  }).then((view) => ({ control, ...view }));

describe('src/app/ui/molecules/input-form/input-form.component', () => {
  it('When rendered then shows the label', async () => {
    await renderComponent();

    expect(screen.getByText('Adresse email')).toBeTruthy();
  });

  it('When rendered then associates the label with the input via name', async () => {
    const { container } = await renderComponent();

    expect(container.querySelector('label')?.getAttribute('for')).toBe('email');
    expect(container.querySelector('input')?.getAttribute('id')).toBe('email');
  });

  it('When a type is provided then forwards it to the input', async () => {
    const { container } = await renderComponent(undefined, { type: InputTypeEnum.EMAIL });

    expect(container.querySelector('input')?.getAttribute('type')).toBe('email');
  });

  it('When the user types then updates the bound control', async () => {
    const { control } = await renderComponent();

    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'john@doe.fr' } });

    expect(control.value).toBe('john@doe.fr');
  });

  it('When the control is untouched then does not show an error', async () => {
    const control = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    });

    await renderComponent(control);

    expect(screen.queryByText('Ce champ est requis')).toBeNull();
  });

  it('When the control is invalid and touched then shows the default error message', async () => {
    const control = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    });
    control.markAsTouched();

    await renderComponent(control);

    expect(screen.getByText('Ce champ est requis')).toBeTruthy();
  });

  it('When a custom error message is provided then shows it over the default', async () => {
    const control = new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    });
    control.markAsTouched();

    await renderComponent(control, { errorMessages: { required: 'Le prénom est obligatoire' } });

    expect(screen.getByText('Le prénom est obligatoire')).toBeTruthy();
  });
});
