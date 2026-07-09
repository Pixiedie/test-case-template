import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@ui/atoms/button/button.component';
import { HeadingComponent } from '@ui/atoms/heading/heading.component';
import {
  OfferCardComponent,
  type OfferCardProps,
} from '@ui/organisms/offer-card/offer-card.component';

@Component({
  selector: 'app-eligible-offers',
  imports: [HeadingComponent, OfferCardComponent, ButtonComponent],
  templateUrl: './eligible-offers.component.html',
  styleUrl: './eligible-offers.component.scss',
})
export class EligibleOffersComponent {
  bestFitCards = input.required<OfferCardProps[]>();
  upsellCards = input.required<OfferCardProps[]>();
  hasNoOffer = input.required<boolean>();

  readonly offerSelect = output<OfferCardProps>();
  readonly requestAdvisor = output<void>();
}
