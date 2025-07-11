export type Level = {
	level: number
	range: [number, number]
	basicBonus: number
	durationBonus: number
	extraBonus?: number
	percentage: number
	validDays: number | string
	validHours: number | string
}

export type Bonuses = {
	basicBonus: number
	durationBonus: number
	extraBonus: number
	baseAmount: number
}
export type RewardLevel = {
	level: number
	diamondRange: [number, number]
	validDays: number
	validHours: number
	percentage: number
}
export type CalculationResult = {
	sLuckyBeans: number
	luckyBeans: number
	luxuryBeans: number
	totalTarget: number
	finalIncome: number
}
