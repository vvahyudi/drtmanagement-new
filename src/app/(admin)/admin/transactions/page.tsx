import { redirect } from "next/navigation"

export default function TransactionsPage() {
	redirect("/admin/invoice")
	return null
}
