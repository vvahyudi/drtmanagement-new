interface RivoUserResponse {
	code: string
	nickname: string
	avatar: string
}

export async function checkRivoUser(
	userId: string,
): Promise<RivoUserResponse | null> {
	try {
		const response = await fetch(
			`https://rivo-api.rivogames.com/check-user/${userId}`,
		)
		if (response.status === 200) {
			const data = await response.json()
			return {
				code: data.code,
				nickname: data.nickname,
				avatar: data.avatar,
			}
		}
		return null
	} catch (error) {
		console.error("Error checking Rivo user:", error)
		return null
	}
}
