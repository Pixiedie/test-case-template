import { Injectable } from '@angular/core';
import { LEGAL_FORMS } from '@data/legal-forms.data';
import type { LegalForm } from '@appTypes/LegalForm.types';
import { of, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LegalFormService {
  getLegalForms(): Observable<LegalForm[]> {
    return of(LEGAL_FORMS);
  }
}
