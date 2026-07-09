import { animate, style, transition, trigger } from '@angular/animations';
import { CurrencyPipe, formatCurrency } from '@angular/common';
import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import type { BusinessLocationEnum } from '@appTypes/BusinessLocation.types';
import type { LegalFormEnum } from '@appTypes/LegalForm.types';
import { type Offer, OfferRecommendationEnum } from '@appTypes/Product.types';
import { ButtonComponent } from '@ui/atoms/button/button.component';
import { FormContainerComponent } from '@ui/atoms/form-container/form-container.component';
import { HeadingComponent } from '@ui/atoms/heading/heading.component';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { AutocompleteFormComponent } from '@ui/molecules/autocomplete-form/autocomplete-form.component';
import { SelectFormComponent } from '@ui/molecules/select-form/select-form.component';
import { OfferCardComponent, type OfferCardProps } from '@ui/organisms/offer-card/offer-card.component';
import { filterOptionsByLabel } from '@utils/filterOptionsByLabel.utils';
import { of, switchMap } from 'rxjs';
import {
  SubscriberFormComponent,
  type SubscriberInfoType,
} from './components/subscriber-form/subscriber-form.component';
import { SubscriptionHeaderComponent } from './components/subscription-header/subscription-header.component';
import { BusinessLocationService } from './services/business-location.service';
import { SubscriptionIntentEnum, SubscriptionViewEnum } from './subscription.enums';
import { getSubscriptionHeaderContent } from './utils/subscriptionHeader.utils';
import { EligibilityService } from './services/eligibility.service';
import { LegalFormService } from './services/legal-form.service';
import { ProfessionalActivityService } from './services/professional-activity.service';
import { TurnoverService } from './services/turnover.service';
import type { EligibilityCriteria } from './services/utils/computeEligibleOffers.utils';

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
  imports: [
    FormContainerComponent,
    AutocompleteFormComponent,
    SelectFormComponent,
    CurrencyPipe,
    HeadingComponent,
    OfferCardComponent,
    ButtonComponent,
    SubscriberFormComponent,
    SubscriptionHeaderComponent,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideOutLeft', [
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateX(-40px)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('300ms 150ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class SubscriptionComponent {
  private readonly activityService = inject(ProfessionalActivityService);
  private readonly legalFormService = inject(LegalFormService);
  private readonly turnoverService = inject(TurnoverService);
  private readonly businessLocationService = inject(BusinessLocationService);
  private readonly eligibilityService = inject(EligibilityService);
  private readonly locale = inject(LOCALE_ID);

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

  readonly form = new FormGroup<SubscriptionFormControls>({
    activity: createField(),
    legalForm: createField(),
    turnover: createField(),
    location: createField(),
  });

  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  // Progressive reveal: each field appears once the previous ones are filled.
  readonly visibleStep = computed(() => {
    const { activity, legalForm, turnover } = this.formValue();

    if (!activity) return 1;
    if (!legalForm) return 2;
    if (!turnover) return 3;
    return 4;
  });

  private readonly criteria = computed<EligibilityCriteria | null>(() => {
    const { activity, legalForm, turnover, location } = this.formValue();

    if (!activity || !legalForm || !turnover || !location) {
      return null;
    }

    const turnoverAmount = this.turnovers().find((item) => item.id === turnover)?.amount;

    if (turnoverAmount === undefined) {
      return null;
    }

    return {
      activityId: activity,
      legalFormId: legalForm as LegalFormEnum,
      turnoverAmount,
      locationId: location as BusinessLocationEnum,
    };
  });

  private readonly offers = toSignal(
    toObservable(this.criteria).pipe(
      switchMap((criteria) =>
        criteria ? this.eligibilityService.getEligibleOffers(criteria) : of<Offer[]>([])
      )
    ),
    { initialValue: [] as Offer[] }
  );

  readonly bestFitCards = computed<OfferCardProps[]>(() =>
    this.offers()
      .filter((offer) => offer.recommendation === OfferRecommendationEnum.BEST_FIT)
      .map((offer, index) => this.toCardProps(offer, index === 0))
  );

  readonly upsellCards = computed<OfferCardProps[]>(() =>
    this.offers()
      .filter((offer) => offer.recommendation === OfferRecommendationEnum.UPSELL)
      .map((offer) => this.toCardProps(offer, false))
  );

  protected readonly SubscriptionViewEnum = SubscriptionViewEnum;
  protected readonly SubscriptionIntentEnum = SubscriptionIntentEnum;

  readonly view = signal<SubscriptionViewEnum>(SubscriptionViewEnum.FORM);

  readonly intent = signal<SubscriptionIntentEnum>(SubscriptionIntentEnum.SUBSCRIPTION);

  readonly canSeeOffers = computed(() => this.criteria() !== null);

  readonly hasNoOffer = computed(() => this.criteria() !== null && this.offers().length === 0);

  readonly selectedOffer = signal<OfferCardProps | null>(null);

  readonly subscriber = signal<SubscriberInfoType | null>(null);

  private readonly subscriberOrigin = signal<SubscriptionViewEnum>(SubscriptionViewEnum.RESULTS);

  readonly subscriberSubmitLabel = computed(() =>
    this.intent() === SubscriptionIntentEnum.ADVISOR ? 'Être rappelé' : 'Souscrire'
  );

  readonly totalSteps = 4;

  readonly header = computed(() => getSubscriptionHeaderContent(this.view(), this.intent()));

  readonly backLabel = computed(() => {
    switch (this.view()) {
      case SubscriptionViewEnum.RESULTS:
        return getSubscriptionHeaderContent(SubscriptionViewEnum.FORM, this.intent()).label;
      case SubscriptionViewEnum.SUBSCRIBER:
        return getSubscriptionHeaderContent(this.subscriberOrigin(), this.intent()).label;
      default:
        return '';
    }
  });

  private readonly selectedActivityLabel = computed(() => {
    const activityId = this.formValue().activity;
    return this.activities().find((activity) => activity.id === activityId)?.label ?? '';
  });

  showOffers(): void {
    this.view.set(SubscriptionViewEnum.RESULTS);
  }

  onOfferSelect(card: OfferCardProps): void {
    this.selectedOffer.set(card);
    this.intent.set(SubscriptionIntentEnum.SUBSCRIPTION);
    this.subscriberOrigin.set(SubscriptionViewEnum.RESULTS);
    this.view.set(SubscriptionViewEnum.SUBSCRIBER);
  }

  requestAdvisor(): void {
    this.subscriberOrigin.set(this.view());
    this.intent.set(SubscriptionIntentEnum.ADVISOR);
    this.view.set(SubscriptionViewEnum.SUBSCRIBER);
  }

  onBack(): void {
    if (this.view() === SubscriptionViewEnum.SUBSCRIBER) {
      this.view.set(this.subscriberOrigin());
      return;
    }

    this.view.set(SubscriptionViewEnum.FORM);
  }

  onSubscriberSubmit(info: SubscriberInfoType): void {
    this.subscriber.set(info);
    this.view.set(SubscriptionViewEnum.DONE);
  }

  private toCardProps(offer: Offer, recommended: boolean): OfferCardProps {
    const { product } = offer;

    return {
      tagLabel: product.insurer,
      recommended,
      title: product.name,
      lines: [
        { label: 'Activité', value: this.selectedActivityLabel() },
        { label: 'Localisation', value: this.locationLabel(product.location) },
        { label: 'CA max couvert', value: this.capitalLabel(product.maxTurnover) },
      ],
      price: product.premium,
      priceLabel: 'Prime annuelle',
      pricePeriod: '/an',
      ctaLabel: 'Souscrire',
    };
  }

  private locationLabel(location: BusinessLocationEnum): string {
    return this.businessLocations().find((item) => item.id === location)?.label ?? '';
  }

  private capitalLabel(maxTurnover: number | null): string {
    return maxTurnover === null
      ? 'Illimité'
      : formatCurrency(maxTurnover, this.locale, '€', 'EUR', '1.0-0');
  }
}
