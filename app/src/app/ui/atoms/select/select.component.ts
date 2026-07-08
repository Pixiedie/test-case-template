import { Component, forwardRef, input, signal } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SelectOptionsType = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOptionsType[];
  placeholder: string;
};

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  options = input.required<SelectProps['options']>();
  placeholder = input.required<SelectProps['placeholder']>();
  id = input<string>();

  readonly value = signal<SelectOptionsType['value'] | undefined>(undefined);
  readonly disabled = signal<boolean>(false);

  private onChange: (value: SelectOptionsType['value']) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: SelectOptionsType['value']): void {
    this.value.set(value);
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

  select(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  markTouched(): void {
    this.onTouched();
  }
}
