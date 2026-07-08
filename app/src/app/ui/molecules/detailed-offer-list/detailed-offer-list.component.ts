import { Component, input } from '@angular/core';
import {
  DetailedOfferLineComponent,
  type DetailedOfferLineProps,
} from '@ui/molecules/detailed-offer-line/detailed-offer-line.component';

export type DetailedOfferListProps = {
  lines: DetailedOfferLineProps[];
};

@Component({
  selector: 'app-detailed-offer-list',
  imports: [DetailedOfferLineComponent],
  templateUrl: './detailed-offer-list.component.html',
  styleUrl: './detailed-offer-list.component.scss',
})
export class DetailedOfferListComponent {
  lines = input.required<DetailedOfferListProps['lines']>();
}
