import { OverlayModule } from '@angular/cdk/overlay';
import { Component, type ElementRef, forwardRef, input, output, signal, viewChild } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';

@Component({
  selector: 'app-autocomplete',
  imports: [OverlayModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  options = input.required<SelectOptionsType[]>();
  placeholder = input.required<string>();
  id = input<string>();

  readonly queryChange = output<string>();
  readonly selectionChange = output<string>();

  private readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');

  readonly value = signal<string>('');
  readonly query = signal<string>('');
  readonly isOpen = signal<boolean>(false);
  readonly activeIndex = signal<number>(-1);
  readonly disabled = signal<boolean>(false);
  readonly panelWidth = signal<number>(0);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
    this.query.set(this.labelFor(value) ?? '');
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

  open(): void {
    if (this.disabled()) {
      return;
    }
    this.panelWidth.set(this.inputRef().nativeElement.offsetWidth);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.activeIndex.set(-1);
    this.query.set(this.labelFor(this.value()) ?? '');
    this.onTouched();
  }

  onFocus(): void {
    this.open();
    this.queryChange.emit('');
  }

  onInput(text: string): void {
    this.query.set(text);
    this.activeIndex.set(-1);
    this.queryChange.emit(text);
    if (!this.isOpen()) {
      this.open();
    }
  }

  selectOption(option: SelectOptionsType): void {
    this.value.set(option.value);
    this.query.set(option.label);
    this.onChange(option.value);
    this.selectionChange.emit(option.value);
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    const options = this.options();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.open();
          return;
        }
        this.activeIndex.update((index) => Math.min(index + 1, options.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((index) => Math.max(index - 1, 0));
        break;
      case 'Enter': {
        const active = options[this.activeIndex()];
        if (this.isOpen() && active) {
          event.preventDefault();
          this.selectOption(active);
        }
        break;
      }
      case 'Escape':
        this.close();
        break;
    }
  }

  private labelFor(value: string): string | undefined {
    return this.options().find((option) => option.value === value)?.label;
  }
}
