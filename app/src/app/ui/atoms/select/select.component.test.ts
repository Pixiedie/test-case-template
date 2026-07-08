import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { SelectComponent, type SelectOptionsType } from './select.component';

const OPTIONS: SelectOptionsType[] = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('src/app/ui/atoms/select/select.component', () => {
  it('When options are provided then renders one option per item plus the placeholder', async () => {
    await renderWithProviders(SelectComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });

    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByText('Choisir')).toBeTruthy();
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('When the form pushes a value then the select reflects it', async () => {
    const { fixture } = await renderWithProviders(SelectComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });

    fixture.componentInstance.writeValue('b');
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('b');
  });

  it('When the user selects an option then notifies the form and updates the value', async () => {
    const { fixture } = await renderWithProviders(SelectComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'a' } });

    expect(onChange).toHaveBeenCalledWith('a');
    expect(fixture.componentInstance.value()).toBe('a');
  });

  it('When the disabled state is set then the select is disabled', async () => {
    const { fixture } = await renderWithProviders(SelectComponent, {
      inputs: { options: OPTIONS, placeholder: 'Choisir' },
    });

    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect((screen.getByRole('combobox') as HTMLSelectElement).disabled).toBe(true);
  });
});
