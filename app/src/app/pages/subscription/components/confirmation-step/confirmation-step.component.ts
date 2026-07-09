import { formatCurrency } from '@angular/common';
import { Component, computed, inject, input, LOCALE_ID } from '@angular/core';
import { CardComponent } from '@ui/atoms/card/card.component';
import { HeadingComponent } from '@ui/atoms/heading/heading.component';
import type { DetailedOfferLineProps } from '@ui/molecules/detailed-offer-line/detailed-offer-line.component';
import { DetailedOfferListComponent } from '@ui/molecules/detailed-offer-list/detailed-offer-list.component';
import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import type { SubscriberInfoType } from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'app-confirmation-step',
  imports: [CardComponent, HeadingComponent, DetailedOfferListComponent],
  templateUrl: './confirmation-step.component.html',
  styleUrl: './confirmation-step.component.scss',
})
export class ConfirmationStepComponent {
  private readonly locale = inject(LOCALE_ID);

  offer = input<OfferCardProps | null>(null);
  subscriber = input<SubscriberInfoType | null>(null);

  readonly lines = computed<DetailedOfferLineProps[]>(() => {
    const offer = this.offer();
    const subscriber = this.subscriber();
    const lines: DetailedOfferLineProps[] = [];

    if (offer) {
      lines.push({ label: 'Offre', value: offer.title });
      lines.push({
        label: offer.priceLabel,
        value: `${formatCurrency(offer.price, this.locale, '€', 'EUR', '1.2-2')} ${offer.pricePeriod}`,
      });
    }

    if (subscriber) {
      lines.push({ label: 'Nom', value: `${subscriber.firstName} ${subscriber.lastName}` });
      lines.push({ label: 'Email', value: subscriber.email });
      lines.push({ label: 'Téléphone', value: subscriber.phone });
      lines.push({ label: 'Adresse', value: subscriber.address });
    }

    return lines;
  });
}
