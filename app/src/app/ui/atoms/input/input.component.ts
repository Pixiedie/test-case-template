import { Component, forwardRef, input, signal } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum InputTypeEnum {
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  NUMBER = 'number',
}

export type InputComponentProps = {
  placeholder: string;
  id: string;
  type: InputTypeEnum;
};

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  placeholder = input<InputComponentProps['placeholder']>('');
  id = input<InputComponentProps['id']>();
  type = input<InputComponentProps['type']>(InputTypeEnum.TEXT);

  readonly value = signal<string>('');
  readonly disabled = signal<boolean>(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  markTouched(): void {
    this.onTouched();
  }
}
