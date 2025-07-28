import crypto from "crypto"

export async function POST(req: Request) {
	const body = await req.json()
	const { agentId, signatureNonce, timestamp, toUId, coin, orderId } = body

	const AGENT_KEY = process.env.RIVO_AGENT_KEY!
	const signatureString = `${agentId}|${signatureNonce}|${AGENT_KEY}|${timestamp}`
	const signature = crypto
		.createHash("md5")
		.update(signatureString)
		.digest("hex")

	const payload = {
		agentId,
		toUId,
		coin,
		orderId,
		signature,
		signatureNonce,
		timestamp,
	}

	const res = await fetch(
		"http://apiserver.rivoworldserver.com/v2/third/agent/sell-coin",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		},
	)

	const data = await res.json()
	return Response.json(data)
}
