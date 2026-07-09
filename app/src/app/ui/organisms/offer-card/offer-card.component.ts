import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@ui/atoms/button/button.component';
import { CardComponent, CardVariantEnum } from '@ui/atoms/card/card.component';
import { HeadingComponent } from '@ui/atoms/heading/heading.component';
import { TagComponent, TagVariantEnum } from '@ui/atoms/tag/tag.component';
import type { DetailedOfferLineProps } from '@ui/molecules/detailed-offer-line/detailed-offer-line.component';
import { DetailedOfferListComponent } from '@ui/molecules/detailed-offer-list/detailed-offer-list.component';

export type OfferCardProps = {
  tagLabel: string;
  recommended: boolean;
  title: string;
  lines: DetailedOfferLineProps[];
  price: number;
  priceLabel: string;
  pricePeriod: string;
  ctaLabel: string;
};

@Component({
  selector: 'app-offer-card',
  imports: [
    CurrencyPipe,
    CardComponent,
    TagComponent,
    HeadingComponent,
    DetailedOfferListComponent,
    ButtonComponent,
  ],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.scss',
})
export class OfferCardComponent {
  tagLabel = input.required<OfferCardProps['tagLabel']>();
  recommended = input<OfferCardProps['recommended']>(false);
  title = input.required<OfferCardProps['title']>();
  lines = input.required<OfferCardProps['lines']>();
  price = input.required<OfferCardProps['price']>();
  priceLabel = input.required<OfferCardProps['priceLabel']>();
  pricePeriod = input.required<OfferCardProps['pricePeriod']>();
  ctaLabel = input.required<OfferCardProps['ctaLabel']>();

  readonly offerSelect = output<void>();

  protected readonly recommendedLabel = 'Recommandé';
  protected readonly CardVariantEnum = CardVariantEnum;
  protected readonly TagVariantEnum = TagVariantEnum;
}
