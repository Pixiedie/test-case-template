import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { InputComponent, InputTypeEnum } from './input.component';

describe('src/app/ui/atoms/input/input.component', () => {
  it('When a placeholder is provided then renders it', async () => {
    await renderWithProviders(InputComponent, {
      inputs: { placeholder: 'Votre nom' },
    });

    expect(screen.getByPlaceholderText('Votre nom')).toBeTruthy();
  });

  it('When the form pushes a value then the input reflects it', async () => {
    const { fixture } = await renderWithProviders(InputComponent, {});

    fixture.componentInstance.writeValue('Doe');
    fixture.detectChanges();

    expect(fixture.componentInstance.value()).toBe('Doe');
  });

  it('When the user types then notifies the form', async () => {
    const { fixture } = await renderWithProviders(InputComponent, {});
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'Doe' } });

    expect(onChange).toHaveBeenCalledWith('Doe');
    expect(fixture.componentInstance.value()).toBe('Doe');
  });

  it('When the type is number then sets the input type', async () => {
    await renderWithProviders(InputComponent, {
      inputs: { type: InputTypeEnum.NUMBER },
    });

    expect(screen.getByRole('spinbutton').getAttribute('type')).toBe('number');
  });

  it('When the disabled state is set then the input is disabled', async () => {
    const { fixture } = await renderWithProviders(InputComponent, {});

    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect((screen.getByRole('textbox') as HTMLInputElement).disabled).toBe(true);
  });
});
