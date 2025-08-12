import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false, // Set to true if you want email verification
		passwordMinLength: 6,
	},

	pages: {
		signIn: "/auth/login",
	},
})

// Types will be inferred from the auth instance
export type AuthSession = any
export type AuthUser = any
