import { Component, input } from '@angular/core';
import { type FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '@ui/atoms/label/label.component';
import { SelectComponent, type SelectOptionsType } from '@ui/atoms/select/select.component';

export type SelectFormProps = {
  label: string;
  name: string;
  control: FormControl<string>;
  options: SelectOptionsType[];
  placeholder: string;
};

@Component({
  selector: 'app-select-form',
  imports: [ReactiveFormsModule, LabelComponent, SelectComponent],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss',
})
export class SelectFormComponent {
  label = input.required<SelectFormProps['label']>();
  name = input.required<SelectFormProps['name']>();
  control = input.required<SelectFormProps['control']>();
  options = input.required<SelectFormProps['options']>();
  placeholder = input.required<SelectFormProps['placeholder']>();
}
