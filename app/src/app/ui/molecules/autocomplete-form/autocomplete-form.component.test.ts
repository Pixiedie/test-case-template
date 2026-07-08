import { FormControl } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { AutocompleteFormComponent } from './autocomplete-form.component';

const OPTIONS: SelectOptionsType[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const renderComponent = (
  control = new FormControl<string | undefined>(undefined, {
    nonNullable: true,
  }),
  on: Record<string, unknown> = {}
) =>
  renderWithProviders(AutocompleteFormComponent, {
    inputs: {
      label: 'Activité',
      name: 'activity',
      control,
      options: OPTIONS,
      placeholder: 'Choisir',
    },
    on,
  }).then((view) => ({ control, ...view }));

describe('src/app/ui/molecules/autocomplete-form/autocomplete-form.component', () => {
  it('When rendered then shows the label', async () => {
    await renderComponent();

    expect(screen.getByText('Activité')).toBeTruthy();
  });

  it('When rendered then associates the label with the input via name', async () => {
    const { container } = await renderComponent();

    expect(container.querySelector('label')?.getAttribute('for')).toBe('activity');
    expect(container.querySelector('input')?.getAttribute('id')).toBe('activity');
  });

  it('When the user picks an option then updates the control and emits selectionChange', async () => {
    const onSelection = jest.fn();
    const { control } = await renderComponent(undefined, {
      selectionChange: onSelection,
    });

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option A'));

    expect(control.value).toBe('a');
    expect(onSelection).toHaveBeenCalledWith('a');
  });
});
