import { Component, input } from '@angular/core';

export type DetailedOfferLineProps = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-detailed-offer-line',
  imports: [],
  templateUrl: './detailed-offer-line.component.html',
  styleUrl: './detailed-offer-line.component.scss',
  host: {
    '[class.detailed-offer-line--divider]': 'divider()',
  },
})
export class DetailedOfferLineComponent {
  label = input.required<DetailedOfferLineProps['label']>();
  value = input.required<DetailedOfferLineProps['value']>();
  divider = input<boolean>(false);
}
