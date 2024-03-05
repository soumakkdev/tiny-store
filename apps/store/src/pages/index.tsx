import Header from '@/components/layout/Header'
import Link from 'next/link'

export default function Home() {
	return (
		<section className="container">
			<Header />
			<Link href="/products">
				<img src="/images/nike-just-do-it.jpg" alt="hero-banner" height={500} />
			</Link>
		</section>
	)
}
