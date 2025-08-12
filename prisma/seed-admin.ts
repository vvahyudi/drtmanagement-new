import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
	console.log("🌱 Seeding admin users...")

	// Create ADMIN user
	const adminUser = await prisma.user.upsert({
		where: { email: "ahmadwahyudi2395@gmail.com" },
		update: {
			role: "ADMIN",
		},
		create: {
			email: "ahmadwahyudi2395@gmail.com",
			name: "Ahmad Wahyudi",
			password: "admin123", // This will be hashed by Better Auth
			role: "ADMIN",
			emailVerified: true,
		},
	})

	console.log("✅ Admin user created:", adminUser.email)

	// Create STAFF user
	const staffUser = await prisma.user.upsert({
		where: { email: "staff@drtentertainment.com" },
		update: {
			role: "STAFF",
		},
		create: {
			email: "staff@drtentertainment.com",
			name: "Staff User",
			password: "staff123", // This will be hashed by Better Auth
			role: "STAFF",
			emailVerified: true,
		},
	})

	console.log("✅ Staff user created:", staffUser.email)

	console.log("🎉 Seeding completed!")
}

main()
	.catch((e) => {
		console.error("❌ Seeding failed:", e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
