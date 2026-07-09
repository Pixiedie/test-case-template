import { animate, style, transition, trigger } from '@angular/animations';
import { Component, input, output } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { ButtonComponent } from '@ui/atoms/button/button.component';
import { FormContainerComponent } from '@ui/atoms/form-container/form-container.component';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { AutocompleteFormComponent } from '@ui/molecules/autocomplete-form/autocomplete-form.component';
import { SelectFormComponent } from '@ui/molecules/select-form/select-form.component';
import type { SubscriptionFormControlsType } from '../../subscription.form';

const ACTIVITY_EMPTY_ACTION_LABEL =
  "Votre activité professionnelle n'est pas présente dans les offres souscriptibles en ligne, contactez-nous pour un devis personnalisé.";

@Component({
  selector: 'app-eligibility-form',
  imports: [FormContainerComponent, AutocompleteFormComponent, SelectFormComponent, ButtonComponent],
  templateUrl: './eligibility-form.component.html',
  styleUrl: './eligibility-form.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class EligibilityFormComponent {
  form = input.required<FormGroup<SubscriptionFormControlsType>>();
  activityOptions = input.required<SelectOptionsType[]>();
  legalFormOptions = input.required<SelectOptionsType[]>();
  turnoverOptions = input.required<SelectOptionsType[]>();
  locationOptions = input.required<SelectOptionsType[]>();

  readonly queryChange = output<string>();
  readonly showOffers = output<void>();
  readonly requestAdvisor = output<void>();

  protected readonly emptyActionLabel = ACTIVITY_EMPTY_ACTION_LABEL;

  visibleStep(): number {
    const { activity, legalForm, turnover } = this.form().getRawValue();

    if (!activity) return 1;
    if (!legalForm) return 2;
    if (!turnover) return 3;
    return 4;
  }

  isComplete(): boolean {
    const { activity, legalForm, turnover, location } = this.form().getRawValue();
    return Boolean(activity && legalForm && turnover && location);
  }
}
