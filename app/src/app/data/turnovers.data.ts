import { type Turnover, TurnoverEnum } from "@appTypes/Turnover.types";

export const TURNOVERS: Turnover[] = [
	{ id: TurnoverEnum.UP_TO_150K, label: "Jusqu'à 150 000 €", amount: 150_000 },
	{ id: TurnoverEnum.UP_TO_500K, label: "Jusqu'à 500 000 €", amount: 500_000 },
	{
		id: TurnoverEnum.UP_TO_1M,
		label: "Jusqu'à 1 000 000 €",
		amount: 1_000_000,
	},
	{
		id: TurnoverEnum.UP_TO_1_5M,
		label: "Jusqu'à 1 500 000 €",
		amount: 1_500_000,
	},
	{
		id: TurnoverEnum.UP_TO_2M,
		label: "Jusqu'à 2 000 000 €",
		amount: 2_000_000,
	},
	{
		id: TurnoverEnum.UP_TO_5M,
		label: "Jusqu'à 5 000 000 €",
		amount: 5_000_000,
	},
];
