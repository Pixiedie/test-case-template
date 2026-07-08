import { LEGAL_FORMS } from '@data/legal-forms.data';
import { injectService } from '@testing/render';
import { LegalFormService } from './legal-form.service';

// I know this isn't very useful while the service just returns a mock.
describe('src/app/pages/subscription/services/legal-form.service', () => {
  it('When getLegalForms is called then returns the legal forms list', () => {
    const service = injectService(LegalFormService);
    let result: unknown;

    service.getLegalForms().subscribe((legalForms) => {
      result = legalForms;
    });

    expect(result).toEqual(LEGAL_FORMS);
  });
});
