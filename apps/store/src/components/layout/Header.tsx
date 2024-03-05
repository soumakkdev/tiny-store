import { useAuth } from '@/lib/AuthContext'
import { Store, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Cart from '../cart/Cart'
import CartButton from '../cart/CartButton'

export default function Header() {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const { user } = useAuth()

	return (
		<header>
			<div className="flex items-center justify-between py-4">
				<Link href="/" className="flex items-center gap-2">
					<Store className="h-7 w-7 text-primary" />
				</Link>

				<div className="flex gap-1">
					<CartButton onClick={() => setIsCartOpen(true)} />

					{user ? (
						<div className="bg-cyan-500 text-white uppercase text-lg font-semibold h-10 w-10 rounded-full grid place-content-center cursor-pointer">
							{user?.email?.slice(0, 1)}
						</div>
					) : (
						<Link href="/login">
							<div className="hover:bg-slate-100 h-10 w-10 rounded-full grid place-content-center cursor-pointer">
								<User className="h-6 w-6" />
							</div>
						</Link>
					)}
				</div>
			</div>

			<Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
		</header>
	)
}
