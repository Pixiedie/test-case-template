import { BusinessLocationEnum } from '@appTypes/BusinessLocation.types';
import { LegalFormEnum } from '@appTypes/LegalForm.types';
import { InsurerEnum, LegalFormRuleTypeEnum, type Product } from '@appTypes/Product.types';

const AXA_ACTIVITIES = [
  'communication-consulting',
  'art-objects-trade',
  'artificial-flower-decorations',
  'metal-engraving',
  'tour-guide',
  'event-organization',
  'sociologist',
];

const HISCOX_ACTIVITIES = [
  'communication-consulting',
  'art-objects-trade',
  'crossword-setter',
  'illuminator',
  'metal-engraving',
  'clock-repair',
  'sociologist',
];

const WATERPROOF_EXCLUDED_LEGAL_FORMS = [
  LegalFormEnum.AUTO_ENTREPRENEUR,
  LegalFormEnum.EI,
  LegalFormEnum.EIRL,
  LegalFormEnum.EURL,
];

export const PRODUCTS: Product[] = [
  // WAKAM — For self-employed: AUTO_ENTREPRENEUR only, France, no turnover cap, premium per activity
  {
    id: 'wakam-self-employed-standard',
    name: 'For self-employed person',
    insurer: InsurerEnum.WAKAM,
    activityIds: [
      'art-objects-trade',
      'illuminator',
      'metal-engraving',
      'event-organization',
      'clock-repair',
    ],
    legalFormRule: { type: LegalFormRuleTypeEnum.INCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
    maxTurnover: null,
    location: BusinessLocationEnum.FRANCE,
    premium: 239.88,
  },
  {
    id: 'wakam-self-employed-reduced',
    name: 'For self-employed person',
    insurer: InsurerEnum.WAKAM,
    activityIds: ['artificial-flower-decorations', 'crossword-setter', 'tour-guide', 'sociologist'],
    legalFormRule: { type: LegalFormRuleTypeEnum.INCLUDE, ids: [LegalFormEnum.AUTO_ENTREPRENEUR] },
    maxTurnover: null,
    location: BusinessLocationEnum.FRANCE,
    premium: 119.88,
  },

  // AXA — France tiers, any legal form
  {
    id: 'axa-starter',
    name: 'Starter',
    insurer: InsurerEnum.AXA,
    activityIds: AXA_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 150_000,
    location: BusinessLocationEnum.FRANCE,
    premium: 214.8,
  },
  {
    id: 'axa-rainboots',
    name: 'Rainboots',
    insurer: InsurerEnum.AXA,
    activityIds: AXA_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 500_000,
    location: BusinessLocationEnum.FRANCE,
    premium: 277.2,
  },
  {
    id: 'axa-raincoat',
    name: 'Raincoat',
    insurer: InsurerEnum.AXA,
    activityIds: AXA_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 1_000_000,
    location: BusinessLocationEnum.FRANCE,
    premium: 334.8,
  },

  // AXA Waterproof — World, excludes AUTO_ENTREPRENEUR/EI/EIRL/EURL, turnover cap varies by activity
  {
    id: 'axa-waterproof-2m',
    name: 'Waterproof',
    insurer: InsurerEnum.AXA,
    activityIds: ['communication-consulting', 'tour-guide', 'event-organization'],
    legalFormRule: {
      type: LegalFormRuleTypeEnum.EXCLUDE,
      ids: WATERPROOF_EXCLUDED_LEGAL_FORMS,
    },
    maxTurnover: 2_000_000,
    location: BusinessLocationEnum.WORLD,
    premium: 403.2,
  },
  {
    id: 'axa-waterproof-1-5m',
    name: 'Waterproof',
    insurer: InsurerEnum.AXA,
    activityIds: ['art-objects-trade', 'artificial-flower-decorations', 'metal-engraving', 'sociologist'],
    legalFormRule: {
      type: LegalFormRuleTypeEnum.EXCLUDE,
      ids: WATERPROOF_EXCLUDED_LEGAL_FORMS,
    },
    maxTurnover: 1_500_000,
    location: BusinessLocationEnum.WORLD,
    premium: 403.2,
  },

  // HISCOX — World tiers, any legal form
  {
    id: 'hiscox-avantage',
    name: 'Avantage',
    insurer: InsurerEnum.HISCOX,
    activityIds: HISCOX_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 150_000,
    location: BusinessLocationEnum.WORLD,
    premium: 265.2,
  },
  {
    id: 'hiscox-avantage-plus',
    name: 'Avantage Plus',
    insurer: InsurerEnum.HISCOX,
    activityIds: HISCOX_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 500_000,
    location: BusinessLocationEnum.WORLD,
    premium: 330,
  },
  {
    id: 'hiscox-avantage-premium',
    name: 'Avantage Premium',
    insurer: InsurerEnum.HISCOX,
    activityIds: HISCOX_ACTIVITIES,
    legalFormRule: { type: LegalFormRuleTypeEnum.ANY },
    maxTurnover: 5_000_000,
    location: BusinessLocationEnum.WORLD,
    premium: 386.4,
  },
];
