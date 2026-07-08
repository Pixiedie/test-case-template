import { Injectable } from '@angular/core';
import { BUSINESS_LOCATIONS } from '@data/business-locations.data';
import type { BusinessLocation } from '@appTypes/BusinessLocation.types';
import { of, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusinessLocationService {
  getBusinessLocations(): Observable<BusinessLocation[]> {
    return of(BUSINESS_LOCATIONS);
  }
}
