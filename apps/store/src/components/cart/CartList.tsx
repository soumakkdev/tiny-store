import { formatCurrency } from '@/lib/helpers'
import { Trash2 } from 'lucide-react'
import useCart from './useCart'

export default function CartList() {
	const { cartItems, removeItemFromCart } = useCart()
	return (
		<div className="divide-y overflow-auto flex-1">
			{cartItems?.map((cartItem, idx) => {
				return (
					<div key={idx} className="py-3 flex gap-3">
						<figure>
							<img src={cartItem.images[0]?.url} alt="" width={80} />
						</figure>
						<div>
							<p className="font-medium">{cartItem.name}</p>
							<p>MRP: {formatCurrency(cartItem.price)}</p>
							<Trash2 className="mt-3 h-4 w-4 text-red-500" onClick={() => removeItemFromCart(idx)} />
						</div>
					</div>
				)
			})}
		</div>
	)
}
