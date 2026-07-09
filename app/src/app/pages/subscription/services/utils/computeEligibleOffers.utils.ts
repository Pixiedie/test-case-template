import { BusinessLocationEnum } from "@appTypes/BusinessLocation.types";
import type { LegalFormEnum } from "@appTypes/LegalForm.types";
import {
	type LegalFormRule,
	LegalFormRuleTypeEnum,
	type Offer,
	OfferRecommendationEnum,
	type Product,
} from "@appTypes/Product.types";

export type EligibilityCriteria = {
	activityId: string;
	legalFormId: LegalFormEnum;
	turnoverAmount: number;
	locationId: BusinessLocationEnum;
};

export const matchesActivity = (product: Product, activityId: string): boolean =>
	product.activityIds.includes(activityId);

export const matchesLegalForm = (
	rule: LegalFormRule,
	legalFormId: LegalFormEnum,
): boolean => {
	switch (rule.type) {
		case LegalFormRuleTypeEnum.ANY:
			return true;
		case LegalFormRuleTypeEnum.INCLUDE:
			return rule.ids.includes(legalFormId);
		case LegalFormRuleTypeEnum.EXCLUDE:
			return !rule.ids.includes(legalFormId);
	}
};

export const matchesTurnover = (
	maxTurnover: number | null,
	turnoverAmount: number,
): boolean => maxTurnover === null || turnoverAmount <= maxTurnover;

export const matchesLocation = (
	productLocation: BusinessLocationEnum,
	userLocation: BusinessLocationEnum,
): boolean =>
	productLocation === BusinessLocationEnum.WORLD ||
	userLocation === BusinessLocationEnum.FRANCE;

const BEST_FIT_COUNT = 3;
const UPSELL_COUNT = 2;

// A missing cap means unlimited capital: the product covers any turnover.
const capitalOf = (maxTurnover: number | null): number =>
	maxTurnover ?? Number.POSITIVE_INFINITY;

// An unlimited-capital product fits any turnover, so it belongs with the
// best-fit offers rather than being treated as a higher tier.
export const isBestFit = (product: Product, bestFitCapital: number): boolean =>
	product.maxTurnover === null || product.maxTurnover === bestFitCapital;

// Upsell = a genuine trade-up: a finite capital strictly above the best-fit tier.
export const isUpsell = (product: Product, bestFitCapital: number): boolean =>
	product.maxTurnover !== null && product.maxTurnover > bestFitCapital;

export const computeEligibleOffers = (
	criteria: EligibilityCriteria,
	products: Product[],
): Offer[] => {
	const eligibleProducts = products
		.filter(
			(product) =>
				matchesActivity(product, criteria.activityId) &&
				matchesLegalForm(product.legalFormRule, criteria.legalFormId) &&
				matchesTurnover(product.maxTurnover, criteria.turnoverAmount) &&
				matchesLocation(product.location, criteria.locationId),
		)
		.sort((a, b) => a.premium - b.premium);

	if (eligibleProducts.length === 0) {
		return [];
	}

	// Best fit = tightest finite capital that still covers the requested turnover.
	const bestFitCapital = Math.min(
		...eligibleProducts.map((product) => capitalOf(product.maxTurnover)),
	);

	const bestFitProducts = eligibleProducts
		.filter((product) => isBestFit(product, bestFitCapital))
		.slice(0, BEST_FIT_COUNT);

	const upsellProducts = eligibleProducts
		.filter((product) => isUpsell(product, bestFitCapital))
		.slice(0, UPSELL_COUNT);

	return [
		...bestFitProducts.map((product) => ({
			product,
			recommendation: OfferRecommendationEnum.BEST_FIT,
		})),
		...upsellProducts.map((product) => ({
			product,
			recommendation: OfferRecommendationEnum.UPSELL,
		})),
	];
};
