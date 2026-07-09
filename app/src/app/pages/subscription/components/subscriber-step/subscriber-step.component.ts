import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import {
  SubscriberFormComponent,
  type SubscriberInfoType,
} from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'app-subscriber-step',
  imports: [CurrencyPipe, SubscriberFormComponent],
  templateUrl: './subscriber-step.component.html',
  styleUrl: './subscriber-step.component.scss',
})
export class SubscriberStepComponent {
  submitLabel = input.required<string>();
  offer = input<OfferCardProps | null>(null);

  readonly formSubmit = output<SubscriberInfoType>();
}
