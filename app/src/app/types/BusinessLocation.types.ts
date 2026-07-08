export enum BusinessLocationEnum {
  FRANCE = 'france',
  WORLD = 'world',
}

export type BusinessLocation = {
  id: BusinessLocationEnum;
  label: string;
};
