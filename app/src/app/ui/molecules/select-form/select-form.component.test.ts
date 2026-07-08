import { FormControl } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { SelectFormComponent } from './select-form.component';

const OPTIONS: SelectOptionsType[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const renderComponent = (
  control = new FormControl<string | undefined>(undefined, { nonNullable: true }),
  on: Record<string, unknown> = {}
) =>
  renderWithProviders(SelectFormComponent, {
    inputs: {
      label: 'Activité',
      name: 'activity',
      control,
      options: OPTIONS,
      placeholder: 'Choisir',
    },
    on,
  }).then((view) => ({ control, ...view }));

describe('src/app/ui/molecules/select-form/select-form.component', () => {
  it('When rendered then shows the label', async () => {
    await renderComponent();

    expect(screen.getByText('Activité')).toBeTruthy();
  });

  it('When rendered then associates the label with the select via name', async () => {
    const { container } = await renderComponent();

    expect(container.querySelector('label')?.getAttribute('for')).toBe('activity');
    expect(container.querySelector('select')?.getAttribute('id')).toBe('activity');
  });

  it('When the user selects an option then updates the bound control', async () => {
    const { control } = await renderComponent();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } });

    expect(control.value).toBe('b');
  });

  it('When the user selects an option then emits selectionChange', async () => {
    const onSelection = jest.fn();
    await renderComponent(undefined, { selectionChange: onSelection });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } });

    expect(onSelection).toHaveBeenCalledWith('b');
  });
});
