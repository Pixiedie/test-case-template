import type { BusinessLocationEnum } from '@appTypes/BusinessLocation.types';
import type { LegalFormEnum } from '@appTypes/LegalForm.types';

export enum InsurerEnum {
  WAKAM = 'WAKAM',
  AXA = 'AXA',
  HISCOX = 'HISCOX',
}

export enum LegalFormRuleTypeEnum {
  ANY = 'any',
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
}

export enum OfferRecommendationEnum {
  BEST_FIT = 'best-fit',
  UPSELL = 'upsell',
}

export type LegalFormRule =
  | { type: LegalFormRuleTypeEnum.ANY }
  | { type: LegalFormRuleTypeEnum.INCLUDE; ids: LegalFormEnum[] }
  | { type: LegalFormRuleTypeEnum.EXCLUDE; ids: LegalFormEnum[] };

export type Product = {
  id: string;
  name: string;
  insurer: InsurerEnum;
  activityIds: string[];
  legalFormRule: LegalFormRule;
  maxTurnover: number | null;
  location: BusinessLocationEnum;
  premium: number;
};

export type Offer = {
  product: Product;
  recommendation: OfferRecommendationEnum;
};
