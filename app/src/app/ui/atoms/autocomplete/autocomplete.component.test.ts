import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { AutocompleteComponent } from './autocomplete.component';

const OPTIONS: SelectOptionsType[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('src/app/ui/atoms/autocomplete/autocomplete.component', () => {
  it('When focused then opens and shows the options', async () => {
    await renderWithProviders(AutocompleteComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });

    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('When the user types then emits queryChange', async () => {
    const onQuery = jest.fn();
    await renderWithProviders(AutocompleteComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
      on: { queryChange: onQuery },
    });

    fireEvent.input(screen.getByRole('combobox'), { target: { value: 'opt' } });

    expect(onQuery).toHaveBeenCalledWith('opt');
  });

  it('When an option is clicked then emits selectionChange and notifies the form', async () => {
    const onSelection = jest.fn();
    const { fixture } = await renderWithProviders(AutocompleteComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
      on: { selectionChange: onSelection },
    });
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option B'));

    expect(onSelection).toHaveBeenCalledWith('b');
    expect(onChange).toHaveBeenCalledWith('b');
    expect(fixture.componentInstance.value()).toBe('b');
  });

  it('When the form pushes a value then displays its label', async () => {
    const { fixture } = await renderWithProviders(AutocompleteComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });

    fixture.componentInstance.writeValue('a');
    fixture.detectChanges();

    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Option A');
  });

  it('When there are no options and an emptyActionLabel is set then shows the action', async () => {
    await renderWithProviders(AutocompleteComponent, {
      inputs: { options: [], placeholder: 'Choisir', emptyActionLabel: 'Autre activité' },
    });

    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByRole('button', { name: 'Autre activité' })).toBeTruthy();
  });

  it('When the empty action is clicked then emits emptyAction', async () => {
    const onEmptyAction = jest.fn();
    await renderWithProviders(AutocompleteComponent, {
      inputs: { options: [], placeholder: 'Choisir', emptyActionLabel: 'Autre activité' },
      on: { emptyAction: onEmptyAction },
    });

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('button', { name: 'Autre activité' }));

    expect(onEmptyAction).toHaveBeenCalled();
  });

  it('When there are no options and no emptyActionLabel then shows the default empty text', async () => {
    await renderWithProviders(AutocompleteComponent, {
      inputs: { options: [], placeholder: 'Choisir' },
    });

    fireEvent.focus(screen.getByRole('combobox'));

    expect(screen.getByText('Aucun résultat')).toBeTruthy();
  });
});
