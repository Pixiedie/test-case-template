import { Component, input } from '@angular/core';

export type LabelProps = {
  text: string;
  htmlFor?: string;
  required?: boolean;
};

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  text = input.required<LabelProps['text']>();
  htmlFor = input<LabelProps['htmlFor']>();
  required = input<boolean>(false);
}
