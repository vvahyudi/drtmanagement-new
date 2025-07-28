import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
	const body = await req.json()

	// Forward request to external API
	const response = await fetch(
		"http://apiserver.rivoworldserver.com/v2/third/agent/query-coin-balance",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Tambahkan header lain jika diperlukan
			},
			body: JSON.stringify(body),
		},
	)

	const data = await response.json()

	return new Response(JSON.stringify(data), {
		status: response.status,
		headers: { "Content-Type": "application/json" },
	})
}
