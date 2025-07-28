"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 10000,
						retry: 2,
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster position="top-right" />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
