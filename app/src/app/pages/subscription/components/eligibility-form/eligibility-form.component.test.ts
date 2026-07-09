import { FormGroup } from '@angular/forms';
import type { SelectOptionsType } from '@ui/atoms/select/select.component';
import { fireEvent, renderWithProviders, screen } from '@testing/render';
import { createSubscriptionField, type SubscriptionFormControlsType } from '../../subscription.form';
import { EligibilityFormComponent } from './eligibility-form.component';

const OPTIONS: SelectOptionsType[] = [{ value: 'a', label: 'Option A' }];

const buildForm = (value: Partial<Record<keyof SubscriptionFormControlsType, string>> = {}) => {
  const form = new FormGroup<SubscriptionFormControlsType>({
    activity: createSubscriptionField(),
    legalForm: createSubscriptionField(),
    turnover: createSubscriptionField(),
    location: createSubscriptionField(),
  });
  form.patchValue(value);
  return form;
};

const renderComponent = (
  form = buildForm(),
  on: Record<string, unknown> = {}
) =>
  renderWithProviders(EligibilityFormComponent, {
    inputs: {
      form,
      activityOptions: OPTIONS,
      legalFormOptions: OPTIONS,
      turnoverOptions: OPTIONS,
      locationOptions: OPTIONS,
    },
    on,
  });

describe('src/app/pages/subscription/components/eligibility-form/eligibility-form.component', () => {
  it('When the form is empty then shows only the activity field', async () => {
    await renderComponent();

    expect(screen.getByText('Quelle est votre activité professionnelle ?')).toBeTruthy();
    expect(screen.queryByText('Quelle est la forme juridique de votre entreprise ?')).toBeNull();
  });

  it('When the previous fields are filled then reveals the following fields', async () => {
    await renderComponent(buildForm({ activity: 'a', legalForm: 'a', turnover: 'a' }));

    expect(screen.getByText('Quelle est la forme juridique de votre entreprise ?')).toBeTruthy();
    expect(screen.getByText("Quel est votre chiffre d'affaires prévisionnel ?")).toBeTruthy();
    expect(screen.getByText('Où est situé le siège social de votre activité ?')).toBeTruthy();
  });

  it('When every field is filled then shows the offers button and emits showOffers on click', async () => {
    const onShowOffers = jest.fn();
    await renderComponent(
      buildForm({ activity: 'a', legalForm: 'a', turnover: 'a', location: 'a' }),
      { showOffers: onShowOffers }
    );

    fireEvent.click(screen.getByRole('button', { name: 'Voir les offres' }));

    expect(onShowOffers).toHaveBeenCalled();
  });

  it('When not every field is filled then does not show the offers button', async () => {
    await renderComponent(buildForm({ activity: 'a', legalForm: 'a', turnover: 'a' }));

    expect(screen.queryByRole('button', { name: 'Voir les offres' })).toBeNull();
  });
});
