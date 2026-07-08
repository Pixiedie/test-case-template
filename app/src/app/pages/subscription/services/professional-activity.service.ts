import { Injectable } from '@angular/core';
import { PROFESSIONAL_ACTIVITIES } from '@data/professional-activities.data';
import type { ProfessionalActivity } from '@appTypes/ProfessionalActivity.types';
import { of, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfessionalActivityService {
  getActivities(): Observable<ProfessionalActivity[]> {
    return of(PROFESSIONAL_ACTIVITIES);
  }
}
