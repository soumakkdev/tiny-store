import 'keen-slider/keen-slider.min.css'
import '@tiny/ui/dist/index.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/AuthContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const inter = Inter({ subsets: ['latin'] })

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
