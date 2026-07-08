import { type LegalForm, LegalFormEnum } from '@appTypes/LegalForm.types';

export const LEGAL_FORMS: LegalForm[] = [
  { id: LegalFormEnum.AUTO_ENTREPRENEUR, label: 'Micro-entreprise (auto-entrepreneur)' },
  { id: LegalFormEnum.EI, label: 'Entreprise individuelle (EI)' },
  { id: LegalFormEnum.EIRL, label: 'Entreprise individuelle à responsabilité limitée (EIRL)' },
  { id: LegalFormEnum.EURL, label: 'EURL' },
  { id: LegalFormEnum.SARL, label: 'SARL' },
  { id: LegalFormEnum.SASU, label: 'SASU' },
  { id: LegalFormEnum.SAS, label: 'SAS' },
  { id: LegalFormEnum.SA, label: 'SA' },
  { id: LegalFormEnum.SNC, label: 'SNC' },
];
