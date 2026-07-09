import { Component, input } from '@angular/core';

export type StepCounterProps = {
  current: number;
  total: number;
};

@Component({
  selector: 'app-step-counter',
  imports: [],
  templateUrl: './step-counter.component.html',
  styleUrl: './step-counter.component.scss',
})
export class StepCounterComponent {
  current = input.required<StepCounterProps['current']>();
  total = input.required<StepCounterProps['total']>();
}
