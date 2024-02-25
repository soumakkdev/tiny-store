import '@/styles/preflight.css'
import '@tiny/ui/dist/index.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../lib/AuthContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<main className={`${inter.className} h-full w-full`}>
					<Component {...pageProps} />
				</main>
				<Toaster
					position="bottom-center"
					reverseOrder={false}
					toastOptions={{
						duration: 5000,
					}}
				/>
			</AuthProvider>

			<ReactQueryDevtools panelPosition="right" position="bottom-right" />
		</QueryClientProvider>
	)
}
