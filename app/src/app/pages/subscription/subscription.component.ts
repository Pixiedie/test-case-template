import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { FormContainerComponent } from '@ui/atoms/form-container/form-container.component';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { AutocompleteFormComponent } from '@ui/molecules/autocomplete-form/autocomplete-form.component';
import { SelectFormComponent } from '@ui/molecules/select-form/select-form.component';
import { filterOptionsByLabel } from '@utils/filterOptionsByLabel.utils';
import { BusinessLocationService } from './services/business-location.service';
import { LegalFormService } from './services/legal-form.service';
import { ProfessionalActivityService } from './services/professional-activity.service';
import { TurnoverService } from './services/turnover.service';

type SubscriptionField = FormControl<string | undefined>;

type SubscriptionFormControls = {
  activity: SubscriptionField;
  legalForm: SubscriptionField;
  turnover: SubscriptionField;
  location: SubscriptionField;
};

const createField = (): SubscriptionField =>
  new FormControl<string | undefined>(undefined, { nonNullable: true });

@Component({
  selector: 'app-subscription',
  imports: [FormContainerComponent, AutocompleteFormComponent, SelectFormComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SubscriptionComponent {
  private readonly activityService = inject(ProfessionalActivityService);
  private readonly legalFormService = inject(LegalFormService);
  private readonly turnoverService = inject(TurnoverService);
  private readonly businessLocationService = inject(BusinessLocationService);

  private readonly activities = toSignal(this.activityService.getActivities(), {
    initialValue: [],
  });

  private readonly legalForms = toSignal(this.legalFormService.getLegalForms(), {
    initialValue: [],
  });

  private readonly turnovers = toSignal(this.turnoverService.getTurnovers(), {
    initialValue: [],
  });

  private readonly businessLocations = toSignal(this.businessLocationService.getBusinessLocations(), {
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

  readonly legalFormOptions = computed<SelectOptionsType[]>(() =>
    this.legalForms().map((legalForm) => ({
      value: legalForm.id,
      label: legalForm.label,
    }))
  );

  readonly turnoverOptions = computed<SelectOptionsType[]>(() =>
    this.turnovers().map((turnover) => ({
      value: turnover.id,
      label: turnover.label,
    }))
  );

  readonly locationOptions = computed<SelectOptionsType[]>(() =>
    this.businessLocations().map((location) => ({
      value: location.id,
      label: location.label,
    }))
  );

  readonly fieldStep = signal(1);

  readonly form = new FormGroup<SubscriptionFormControls>({
    activity: createField(),
    legalForm: createField(),
    turnover: createField(),
    location: createField(),
  });

  revealField(step: number): void {
    this.fieldStep.set(step);
  }
}
