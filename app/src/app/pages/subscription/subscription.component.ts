import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { SelectFormComponent } from '@ui/molecules/select-form/select-form.component';
import { ProfessionalActivityService } from './services/professional-activity.service';

@Component({
  selector: 'app-subscription',
  imports: [SelectFormComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent {
  private readonly activityService = inject(ProfessionalActivityService);

  private readonly activities = toSignal(this.activityService.getActivities(), {
    initialValue: [],
  });

  readonly options = computed<SelectOptionsType[]>(() =>
    this.activities().map((activity) => ({
      value: activity.id,
      label: activity.label,
    }))
  );

  readonly form = new FormGroup({
    activity: new FormControl<string>('', { nonNullable: true }),
  });
}
