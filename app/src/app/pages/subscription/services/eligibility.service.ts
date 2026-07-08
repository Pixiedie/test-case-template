import { Injectable } from "@angular/core";
import type { Offer } from "@appTypes/Product.types";
import { PRODUCTS } from "@data/products.data";
import {
	computeEligibleOffers,
	type EligibilityCriteria,
} from "@pages/subscription/services/utils/computeEligibleOffers.utils";
import { type Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class EligibilityService {
	getEligibleOffers(criteria: EligibilityCriteria): Observable<Offer[]> {
		return of(computeEligibleOffers(criteria, PRODUCTS));
	}
}
