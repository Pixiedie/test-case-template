import { type BusinessLocation, BusinessLocationEnum } from '@appTypes/BusinessLocation.types';

export const BUSINESS_LOCATIONS: BusinessLocation[] = [
  { id: BusinessLocationEnum.FRANCE, label: 'France' },
  { id: BusinessLocationEnum.WORLD, label: 'Monde (en dehors de la france)' },
];
