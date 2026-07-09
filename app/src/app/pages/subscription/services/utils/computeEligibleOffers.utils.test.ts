import { BusinessLocationEnum } from '@appTypes/BusinessLocation.types';
import { LegalFormEnum } from '@appTypes/LegalForm.types';
import {
  InsurerEnum,
  LegalFormRuleTypeEnum,
  type Offer,
  OfferRecommendationEnum,
  type Product,
} from '@appTypes/Product.types';
import { PRODUCTS } from '@data/products.data';
import {
  computeEligibleOffers,
  type EligibilityCriteria,
  isBestFit,
  isUpsell,
  matchesActivity,
  matchesLegalForm,
  matchesLocation,
  matchesTurnover,
} from './computeEligibleOffers.utils';

const buildProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 'product',
  name: 'Product',
  insurer: InsurerEnum.AXA,
  activityIds: ['sociologist'],
  legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
  maxTurnover: 500_000,
  location: BusinessLocationEnum.FRANCE,
  premium: 100,
  ...overrides,
});

const summarize = (offers: Offer[]) =>
  offers.map((offer) => ({ id: offer.product.id, recommendation: offer.recommendation }));

describe('src/app/pages/subscription/services/utils/computeEligibleOffers.utils', () => {
  describe('matchesActivity', () => {
    it('When the activity is covered by the product then returns true', () => {
      expect(
        matchesActivity(buildProduct({ activityIds: ['sociologist', 'illuminator'] }), 'illuminator')
      ).toBe(true);
    });

    it('When the activity is not covered by the product then returns false', () => {
      expect(matchesActivity(buildProduct({ activityIds: ['sociologist'] }), 'illuminator')).toBe(
        false
      );
    });
  });

  describe('matchesLegalForm', () => {
    it('When the rule is ANY then returns true for any legal form', () => {
      expect(matchesLegalForm({ type: LegalFormRuleTypeEnum.ANY }, LegalFormEnum.SARL)).toBe(true);
    });

    it('When the rule is INCLUDE and the legal form is listed then returns true', () => {
      expect(
        matchesLegalForm(
          { type: LegalFormRuleTypeEnum.INCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
          LegalFormEnum.AUTO_ENTREPRENEUR
        )
      ).toBe(true);
    });

    it('When the rule is INCLUDE and the legal form is not listed then returns false', () => {
      expect(
        matchesLegalForm(
          { type: LegalFormRuleTypeEnum.INCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
          LegalFormEnum.SARL
        )
      ).toBe(false);
    });

    it('When the rule is EXCLUDE and the legal form is listed then returns false', () => {
      expect(
        matchesLegalForm(
          { type: LegalFormRuleTypeEnum.EXCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
          LegalFormEnum.AUTO_ENTREPRENEUR
        )
      ).toBe(false);
    });

    it('When the rule is EXCLUDE and the legal form is not listed then returns true', () => {
      expect(
        matchesLegalForm(
          { type: LegalFormRuleTypeEnum.EXCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
          LegalFormEnum.SARL
        )
      ).toBe(true);
    });
  });

  describe('matchesTurnover', () => {
    it('When the product has no turnover cap then returns true', () => {
      expect(matchesTurnover(null, 5_000_000)).toBe(true);
    });

    it('When the turnover is within the cap then returns true', () => {
      expect(matchesTurnover(500_000, 500_000)).toBe(true);
    });

    it('When the turnover exceeds the cap then returns false', () => {
      expect(matchesTurnover(500_000, 500_001)).toBe(false);
    });
  });

  describe('matchesLocation', () => {
    it('When the product covers the world then returns true for a France user', () => {
      expect(matchesLocation(BusinessLocationEnum.WORLD, BusinessLocationEnum.FRANCE)).toBe(true);
    });

    it('When the product covers the world then returns true for a worldwide user', () => {
      expect(matchesLocation(BusinessLocationEnum.WORLD, BusinessLocationEnum.WORLD)).toBe(true);
    });

    it('When the product is France-only and the user is in France then returns true', () => {
      expect(matchesLocation(BusinessLocationEnum.FRANCE, BusinessLocationEnum.FRANCE)).toBe(true);
    });

    it('When the product is France-only and the user is worldwide then returns false', () => {
      expect(matchesLocation(BusinessLocationEnum.FRANCE, BusinessLocationEnum.WORLD)).toBe(false);
    });
  });

  describe('isBestFit', () => {
    it('When the product has no cap then it is always a best fit', () => {
      expect(isBestFit(buildProduct({ maxTurnover: null }), 150_000)).toBe(true);
    });

    it('When the capital equals the best-fit tier then returns true', () => {
      expect(isBestFit(buildProduct({ maxTurnover: 150_000 }), 150_000)).toBe(true);
    });

    it('When the capital is above the best-fit tier then returns false', () => {
      expect(isBestFit(buildProduct({ maxTurnover: 500_000 }), 150_000)).toBe(false);
    });
  });

  describe('isUpsell', () => {
    it('When the product has no cap then it is never an upsell', () => {
      expect(isUpsell(buildProduct({ maxTurnover: null }), 150_000)).toBe(false);
    });

    it('When the capital is strictly above the best-fit tier then returns true', () => {
      expect(isUpsell(buildProduct({ maxTurnover: 500_000 }), 150_000)).toBe(true);
    });

    it('When the capital equals the best-fit tier then returns false', () => {
      expect(isUpsell(buildProduct({ maxTurnover: 150_000 }), 150_000)).toBe(false);
    });
  });

  describe('computeEligibleOffers', () => {
    it('When a French SARL sociologist earns 500k then best fit is the exact-cap tier and higher tiers are upsells', () => {
      const criteria: EligibilityCriteria = {
        activityId: 'sociologist',
        legalFormId: LegalFormEnum.SARL,
        turnoverAmount: 500_000,
        locationId: BusinessLocationEnum.FRANCE,
      };

      expect(summarize(computeEligibleOffers(criteria, PRODUCTS))).toEqual([
        { id: 'axa-rainboots', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'hiscox-avantage-plus', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'axa-raincoat', recommendation: OfferRecommendationEnum.UPSELL },
        { id: 'hiscox-avantage-premium', recommendation: OfferRecommendationEnum.UPSELL },
      ]);
    });

    it('When the user operates worldwide then France-only products are excluded', () => {
      const criteria: EligibilityCriteria = {
        activityId: 'sociologist',
        legalFormId: LegalFormEnum.SARL,
        turnoverAmount: 1_000_000,
        locationId: BusinessLocationEnum.WORLD,
      };

      expect(summarize(computeEligibleOffers(criteria, PRODUCTS))).toEqual([
        { id: 'axa-waterproof-1-5m', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'hiscox-avantage-premium', recommendation: OfferRecommendationEnum.UPSELL },
      ]);
    });

    it('When an auto-entrepreneur earns 150k then WAKAM unlimited cap is grouped with the best fit, not the upsells', () => {
      const criteria: EligibilityCriteria = {
        activityId: 'art-objects-trade',
        legalFormId: LegalFormEnum.AUTO_ENTREPRENEUR,
        turnoverAmount: 150_000,
        locationId: BusinessLocationEnum.FRANCE,
      };

      expect(summarize(computeEligibleOffers(criteria, PRODUCTS))).toEqual([
        { id: 'axa-starter', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'wakam-self-employed-standard', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'hiscox-avantage', recommendation: OfferRecommendationEnum.BEST_FIT },
        { id: 'axa-rainboots', recommendation: OfferRecommendationEnum.UPSELL },
        { id: 'hiscox-avantage-plus', recommendation: OfferRecommendationEnum.UPSELL },
      ]);
    });

    it('When an auto-entrepreneur is selected then the excluded Waterproof product is never offered', () => {
      const criteria: EligibilityCriteria = {
        activityId: 'art-objects-trade',
        legalFormId: LegalFormEnum.AUTO_ENTREPRENEUR,
        turnoverAmount: 150_000,
        locationId: BusinessLocationEnum.FRANCE,
      };

      const offers = computeEligibleOffers(criteria, PRODUCTS);

      expect(offers.every((offer) => offer.product.name !== 'Waterproof')).toBe(true);
    });

    it('When the turnover exceeds every capped product then returns no offer', () => {
      const criteria: EligibilityCriteria = {
        activityId: 'sociologist',
        legalFormId: LegalFormEnum.SARL,
        turnoverAmount: 10_000_000,
        locationId: BusinessLocationEnum.FRANCE,
      };

      expect(computeEligibleOffers(criteria, PRODUCTS)).toEqual([]);
    });
  });
});
