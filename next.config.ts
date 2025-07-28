import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */

	allowedDevOrigins: [
		"https://tripay.co.id/api-sandbox",
		"https://tripay.co.id/api",
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rivo-app.rivoworldserver.com",
				port: "",
				pathname: "/**",
			},
		],
	},
}

export default nextConfig
