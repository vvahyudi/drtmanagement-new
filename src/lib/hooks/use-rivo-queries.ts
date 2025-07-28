import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
	queryUserInfo,
	sellCoin,
	queryCoinBalance,
	getSellCoinRecords,
} from "../rivo-integration"

// Query keys
const rivoAll = ["rivo"] as const

export const rivoKeys = {
	all: rivoAll,
	userInfo: (userId: number) => [...rivoAll, "user", userId] as const,
	coinBalance: [...rivoAll, "balance"] as const,
	sellRecords: (filters?: {
		page: number
		size: number
		startTimeTicks?: number
		endTimeTicks?: number
		toUId?: number
		orderNum?: string
	}) => [...rivoAll, "records", filters] as const,
}

// 1. Query User Info Hook
export const useUserInfo = (userId: number) => {
	return useQuery({
		queryKey: rivoKeys.userInfo(userId),
		queryFn: () => queryUserInfo(userId),
		enabled: !!userId,
	})
}

// 2. Sell Coin Hook (Temporarily using console.log)
export const useSellCoin = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ userId, amount }: { userId: number; amount: number }) => {
			// Aktifkan query ke API asli
			return sellCoin(userId, amount)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: rivoKeys.coinBalance })
			queryClient.invalidateQueries({
				queryKey: [...rivoKeys.all, "records"],
				exact: false,
			})
		},
	})
}

// 3. Query Coin Balance Hook
export const useCoinBalance = () => {
	return useQuery({
		queryKey: rivoKeys.coinBalance,
		queryFn: () => queryCoinBalance(),
		// Refresh every 30 seconds
		refetchInterval: 30000,
	})
}

// 4. Get Sell Records Hook
export const useSellRecords = (options: {
	page: number
	size: number
	startTimeTicks?: number
	endTimeTicks?: number
	toUId?: number
	orderNum?: string
}) => {
	return useQuery({
		queryKey: rivoKeys.sellRecords(options),
		queryFn: () => getSellCoinRecords(options),
		// Keep data fresh, but don't refetch too often
		staleTime: 30000,
	})
}
