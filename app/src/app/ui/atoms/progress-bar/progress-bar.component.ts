import { Component, computed, input } from '@angular/core';

export type ProgressBarProps = {
  value: number;
  max: number;
};

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  value = input.required<ProgressBarProps['value']>();
  max = input.required<ProgressBarProps['max']>();

  readonly percentage = computed(() => {
    const max = this.max();

    if (max <= 0) {
      return 0;
    }

    const ratio = (this.value() / max) * 100;
    return Math.min(100, Math.max(0, ratio));
  });
}
