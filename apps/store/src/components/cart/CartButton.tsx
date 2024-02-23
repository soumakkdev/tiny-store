import { ShoppingBag } from 'lucide-react'
import useCart from './useCart'

export default function CartButton({ onClick }: { onClick: () => void }) {
	const { count } = useCart()

	return (
		<div className="relative hover:bg-slate-100 h-10 w-10 rounded-full grid place-content-center cursor-pointer" onClick={onClick}>
			<ShoppingBag className="h-6 w-6" />
			{count ? (
				<div className="absolute top-0 right-0 text-xs font-semibold h-5 w-5 rounded-full bg-blue-600 text-white grid place-content-center">
					{count}
				</div>
			) : null}
		</div>
	)
}
