import { Component, input } from '@angular/core';
import { HeadingComponent } from '@ui/atoms/heading/heading.component';
import { ProgressBarComponent } from '@ui/atoms/progress-bar/progress-bar.component';
import { StepCounterComponent } from '@ui/atoms/step-counter/step-counter.component';

export type SubscriptionHeaderProps = {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
};

@Component({
  selector: 'app-subscription-header',
  imports: [ProgressBarComponent, StepCounterComponent, HeadingComponent],
  templateUrl: './subscription-header.component.html',
  styleUrl: './subscription-header.component.scss',
})
export class SubscriptionHeaderComponent {
  currentStep = input.required<SubscriptionHeaderProps['currentStep']>();
  totalSteps = input.required<SubscriptionHeaderProps['totalSteps']>();
  title = input.required<SubscriptionHeaderProps['title']>();
  subtitle = input<SubscriptionHeaderProps['subtitle']>('');
}
