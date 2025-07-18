import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */

	allowedDevOrigins: [
		"local-origin.dev",
		"*.local-origin.dev",
		"localhost:3000",
		"192.168.137.1:3000",
	],
}

export default nextConfig
