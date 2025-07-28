import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Global default options
			staleTime: 10000, // Consider data stale after 10 seconds
			retry: 2, // Retry failed requests 2 times
		},
	},
})

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
