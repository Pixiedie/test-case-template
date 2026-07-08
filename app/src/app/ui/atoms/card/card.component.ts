import { Component, input } from '@angular/core';

export enum CardVariantEnum {
  DEFAULT = 'default',
  HIGHLIGHTED = 'highlighted',
}

export type CardProps = {
  variant: CardVariantEnum;
};

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    class: 'card',
    '[class.card--highlighted]': 'variant() === CardVariantEnum.HIGHLIGHTED',
  },
})
export class CardComponent {
  variant = input<CardProps['variant']>(CardVariantEnum.DEFAULT);

  protected readonly CardVariantEnum = CardVariantEnum;
}
