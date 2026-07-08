import { Component, input } from '@angular/core';

export enum ButtonVariantEnum {
  PRIMARY = 'primary',
}

export type ButtonProps = {
  variant: ButtonVariantEnum;
};

@Component({
  selector: 'button[app-button]',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    class: 'button',
    '[class.button--primary]': 'variant() === ButtonVariantEnum.PRIMARY',
  },
})
export class ButtonComponent {
  variant = input<ButtonProps['variant']>(ButtonVariantEnum.PRIMARY);

  protected readonly ButtonVariantEnum = ButtonVariantEnum;
}
