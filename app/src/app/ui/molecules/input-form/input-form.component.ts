import { Component, input } from '@angular/core';
import { type FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, InputTypeEnum } from '@ui/atoms/input/input.component';
import { LabelComponent } from '@ui/atoms/label/label.component';

export type InputFormProps = {
  label: string;
  name: string;
  control: FormControl<string>;
  type: InputTypeEnum;
  placeholder: string;
  required: boolean;
  errorMessages: Partial<Record<string, string>>;
};

const DEFAULT_ERROR_MESSAGES: Record<string, string> = {
  required: 'Ce champ est requis',
  email: 'Adresse email invalide',
  pattern: 'Format invalide',
};

@Component({
  selector: 'app-input-form',
  imports: [ReactiveFormsModule, LabelComponent, InputComponent],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
})
export class InputFormComponent {
  label = input.required<InputFormProps['label']>();
  name = input.required<InputFormProps['name']>();
  control = input.required<InputFormProps['control']>();
  type = input<InputFormProps['type']>(InputTypeEnum.TEXT);
  placeholder = input<InputFormProps['placeholder']>('');
  required = input<InputFormProps['required']>(false);
  errorMessages = input<InputFormProps['errorMessages']>({});

  hasError(): boolean {
    const control = this.control();
    return control.invalid && control.touched;
  }

  errorMessage(): string {
    const errors = this.control().errors;

    if (!errors) {
      return '';
    }

    const [firstError] = Object.keys(errors);
    return (
      this.errorMessages()[firstError] ?? DEFAULT_ERROR_MESSAGES[firstError] ?? 'Champ invalide'
    );
  }
}
