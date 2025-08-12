import { PrismaClient } from "@prisma/client"
import products from "./product.json"

const prisma = new PrismaClient()

async function main() {
	for (const product of products) {
		await prisma.product.upsert({
			where: { code: product.code },
			update: {},
			create: {
				name: product.name,
				code: product.code,
				amount: product.amount,
				price: product.price,
				purchasePrice: product.purchasePrice,
				bonusAmount: product.bonusAmount,
				status: product.status,
				badge: product.badge,
			},
		})
	}

	console.log("✅ Seeder product selesai")
}

main()
	.catch((e) => {
		console.error("❌ Error:", e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
