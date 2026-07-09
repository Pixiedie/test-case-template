import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@ui/atoms/button/button.component';
import { FormContainerComponent } from '@ui/atoms/form-container/form-container.component';
import { InputTypeEnum } from '@ui/atoms/input/input.component';
import { InputFormComponent } from '@ui/molecules/input-form/input-form.component';
import { phoneValidator } from '@utils/validators.utils';

export type SubscriberInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type SubscriberFormControlsType = {
  [K in keyof SubscriberInfoType]: FormControl<string>;
};

const createTextControl = (validators = [Validators.required]): FormControl<string> =>
  new FormControl<string>('', { nonNullable: true, validators });

@Component({
  selector: 'app-subscriber-form',
  imports: [ReactiveFormsModule, FormContainerComponent, InputFormComponent, ButtonComponent],
  templateUrl: './subscriber-form.component.html',
  styleUrl: './subscriber-form.component.scss',
})
export class SubscriberFormComponent {
  readonly submitLabel = input.required<string>();

  readonly formSubmit = output<SubscriberInfoType>();

  protected readonly InputTypeEnum = InputTypeEnum;

  readonly form = new FormGroup<SubscriberFormControlsType>({
    firstName: createTextControl(),
    lastName: createTextControl(),
    email: createTextControl([Validators.required, Validators.email]),
    phone: createTextControl([Validators.required, phoneValidator]),
    address: createTextControl(),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.form.getRawValue());
  }
}
