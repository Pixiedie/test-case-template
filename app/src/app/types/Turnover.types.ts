export enum TurnoverEnum {
  UP_TO_150K = 'up-to-150k',
  UP_TO_500K = 'up-to-500k',
  UP_TO_1M = 'up-to-1m',
  UP_TO_1_5M = 'up-to-1-5m',
  UP_TO_2M = 'up-to-2m',
  UP_TO_5M = 'up-to-5m',
}

export type Turnover = {
  id: TurnoverEnum;
  label: string;
  amount: number;
};
