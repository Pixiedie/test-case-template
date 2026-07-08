import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { AutocompleteFormComponent } from '@ui/molecules/autocomplete-form/autocomplete-form.component';
import { filterOptionsByLabel } from '@utils/filterOptionsByLabel.utils';
import { ProfessionalActivityService } from './services/professional-activity.service';

@Component({
  selector: 'app-subscription',
  imports: [AutocompleteFormComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent {
  private readonly activityService = inject(ProfessionalActivityService);

  private readonly activities = toSignal(this.activityService.getActivities(), {
    initialValue: [],
  });

  private readonly allOptions = computed<SelectOptionsType[]>(() =>
    this.activities().map((activity) => ({
      value: activity.id,
      label: activity.label,
    }))
  );

  readonly query = signal('');

  readonly options = computed(() => filterOptionsByLabel(this.allOptions(), this.query()));

  readonly form = new FormGroup({
    activity: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
  });
}
