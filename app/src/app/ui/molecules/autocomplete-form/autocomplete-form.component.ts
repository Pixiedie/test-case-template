import { Component, input, output } from '@angular/core';
import { type FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from '@ui/atoms/autocomplete/autocomplete.component';
import { LabelComponent } from '@ui/atoms/label/label.component';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';

export type AutocompleteFormComponentProps = {
  label: string;
  name: string;
  control: FormControl<string | undefined>;
  options: SelectOptionsType[];
  placeholder: string;
};

@Component({
  selector: 'app-autocomplete-form',
  imports: [ReactiveFormsModule, LabelComponent, AutocompleteComponent],
  templateUrl: './autocomplete-form.component.html',
  styleUrl: './autocomplete-form.component.scss',
})
export class AutocompleteFormComponent {
  label = input.required<AutocompleteFormComponentProps['label']>();
  name = input.required<AutocompleteFormComponentProps['name']>();
  control = input.required<AutocompleteFormComponentProps['control']>();
  options = input.required<AutocompleteFormComponentProps['options']>();
  placeholder = input.required<AutocompleteFormComponentProps['placeholder']>();

  readonly queryChange = output<string>();
  readonly selectionChange = output<string>();
}
