import { NextRequest } from "next/server"
import crypto from "crypto"

const AGENT_KEY = process.env.RIVO_AGENT_KEY! // simpan agentKey di .env

export async function POST(req: NextRequest) {
	const body = await req.json()
	const { agentId, signatureNonce, timestamp } = body

	// Generate signature sesuai algoritma
	const signatureString = `${agentId}|${signatureNonce}|${AGENT_KEY}|${timestamp}`
	const signature = crypto
		.createHash("md5")
		.update(signatureString)
		.digest("hex")

	// Build payload untuk API Rivo
	const payload = {
		...body,
		signature,
	}

	const response = await fetch(
		"http://apiserver.rivoworldserver.com/v2/third/agent/query-coin-balance",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		},
	)

	const data = await response.json()

	return new Response(JSON.stringify(data), {
		status: response.status,
		headers: { "Content-Type": "application/json" },
	})
}
