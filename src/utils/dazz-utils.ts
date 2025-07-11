import { rewardLevels } from "@/constants/constants"
import { Level, RewardLevel } from "@/types/types"

export const calculateBonuses = (
	value: number,
	current: Level,
	isWeekly: boolean,
) => {
	const baseAmount = value * 2
	const basicBonus = baseAmount * (current.basicBonus / 100)
	const durationBonus = baseAmount * (current.durationBonus / 100)
	const extraBonus = isWeekly
		? baseAmount * ((current.extraBonus || 0) / 100)
		: 0

	return {
		baseAmount,
		basicBonus,
		durationBonus,
		extraBonus,
		total: basicBonus + durationBonus + extraBonus,
	}
}

export const calculateReward = (
	diamonds: number,
): {
	reward: number
	level: RewardLevel | null
} => {
	const level = rewardLevels.find(
		({ diamondRange }) =>
			diamonds >= diamondRange[0] && diamonds <= diamondRange[1],
	)

	if (!level) {
		return { reward: 0, level: null }
	}

	const reward = diamonds * 2 * (level.percentage / 100)

	return {
		reward,
		level,
	}
}

export const findCurrentLevel = (value: number, levels: Level[]) => {
	return levels.find(({ range }) => value >= range[0] && value <= range[1])
}
