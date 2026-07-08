import { Injectable } from '@angular/core';
import { TURNOVERS } from '@data/turnovers.data';
import type { Turnover } from '@appTypes/Turnover.types';
import { of, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnoverService {
  getTurnovers(): Observable<Turnover[]> {
    return of(TURNOVERS);
  }
}
