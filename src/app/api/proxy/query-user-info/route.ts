export async function POST(req: Request) {
	const body = await req.json()

	const res = await fetch(
		"http://apiserver.rivoworldserver.com/v2/third/agent/query-user-info",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		},
	)

	const data = await res.json()
	return Response.json(data)
}
