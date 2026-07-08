export enum LegalFormEnum {
  AUTO_ENTREPRENEUR = 'auto-entrepreneur',
  EI = 'ei',
  EIRL = 'eirl',
  EURL = 'eurl',
  SARL = 'sarl',
  SASU = 'sasu',
  SAS = 'sas',
  SA = 'sa',
  SNC = 'snc',
}

export type LegalForm = {
  id: LegalFormEnum;
  label: string;
};
