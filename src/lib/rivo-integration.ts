import { MD5 } from "crypto-es/lib/md5"

interface RivoRequestParams {
	agentId: number
	signatureNonce: string
	timestamp: number
	toUId?: number
	coin?: number
	orderId?: string
	page?: number
	size?: number
	startTimeTicks?: number
	endTimeTicks?: number
	orderNum?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_RIVO_API_URL || ""
const AGENT_KEY = process.env.NEXT_PUBLIC_RIVO_AGENT_KEY || ""
const AGENT_ID = Number(process.env.NEXT_PUBLIC_RIVO_AGENT_ID) || 0

// Generate signature based on Rivo's algorithm
const generateSignature = (params: RivoRequestParams): string => {
	const { signatureNonce, timestamp } = params
	return MD5(
		`${AGENT_ID}|${signatureNonce}|${AGENT_KEY}|${timestamp}`,
	).toString()
}

// Generate random signature nonce
const generateSignatureNonce = (): string => {
	return Math.random().toString(36).substring(2, 18)
}

// Get current timestamp
const getTimestamp = (): number => {
	return Math.floor(Date.now() / 1000)
}

// Base request function
const makeRequest = async <T>(
	endpoint: string,
	params: RivoRequestParams,
): Promise<T> => {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			...params,
			agentId: AGENT_ID,
			signature: generateSignature(params),
		}),
	})

	const data = await response.json()
	if (data.code !== "200") {
		throw new Error(`API Error: ${data.msg}`)
	}

	return data as T
}

// 1. Query User Info
export const queryUserInfo = async (userId: number) => {
	const params: RivoRequestParams = {
		agentId: AGENT_ID,
		signatureNonce: generateSignatureNonce(),
		timestamp: getTimestamp(),
		toUId: userId,
	}

	return makeRequest<{
		code: string
		msg: string
		avatar: string
		nickName: string
	}>("/query-user-info", params)
}

// 2. Sell Coin
export const sellCoin = async (userId: number, coinAmount: number) => {
	const params: RivoRequestParams = {
		agentId: AGENT_ID,
		signatureNonce: generateSignatureNonce(),
		timestamp: getTimestamp(),
		toUId: userId,
		coin: coinAmount,
		orderId: Date.now().toString(),
	}

	return makeRequest<{
		code: string
		msg: string
		coinBalance: number
		orderId: string
	}>("/sell-coin", params)
}

// 3. Query Coin Balance
export const queryCoinBalance = async () => {
	const params: RivoRequestParams = {
		agentId: AGENT_ID,
		signatureNonce: generateSignatureNonce(),
		timestamp: getTimestamp(),
	}

	return makeRequest<{
		code: string
		msg: string
		coinBalance: number
	}>("/query-coin-balance", params)
}

// 4. Get Sell Coin Records
export interface SellCoinRecord {
	orderNum: string
	platFormOrderId: string
	uid: string
	coin: string
	createTimeTicks: string
}

export const getSellCoinRecords = async (options: {
	page: number
	size: number
	startTimeTicks?: number
	endTimeTicks?: number
	toUId?: number
	orderNum?: string
}) => {
	const params: RivoRequestParams = {
		agentId: AGENT_ID,
		signatureNonce: generateSignatureNonce(),
		timestamp: getTimestamp(),
		...options,
	}

	return makeRequest<{
		code: string
		msg: string
		records: SellCoinRecord[]
	}>("/sell-coin-record", params)
}
