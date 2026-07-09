import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import type { OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';

@Component({
  selector: 'app-confirmation-step',
  imports: [CurrencyPipe],
  templateUrl: './confirmation-step.component.html',
  styleUrl: './confirmation-step.component.scss',
})
export class ConfirmationStepComponent {
  isAdvisor = input.required<boolean>();
  offer = input<OfferCardProps | null>(null);
}
