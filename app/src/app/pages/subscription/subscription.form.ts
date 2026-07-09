import { FormControl } from '@angular/forms';

export type SubscriptionFieldType = FormControl<string | undefined>;

export type SubscriptionFormControlsType = {
  activity: SubscriptionFieldType;
  legalForm: SubscriptionFieldType;
  turnover: SubscriptionFieldType;
  location: SubscriptionFieldType;
};

export const createSubscriptionField = (): SubscriptionFieldType =>
  new FormControl<string | undefined>(undefined, { nonNullable: true });
