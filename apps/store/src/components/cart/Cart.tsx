import { Button, Drawer } from '@tiny/ui'
import React from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import useCart from './useCart'
import { Inbox } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Cart({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { count } = useCart()
	const { replace } = useRouter()
	return (
		<Drawer open={open} title="Cart" onClose={onClose}>
			<div className="flex flex-col flex-1 px-6">
				{count ? (
					<>
						<CartList />
						<CartSummary />
						<Button size="lg" className="w-full rounded-full mt-5" onClick={() => replace('/place-order')}>
							Place Order
						</Button>
					</>
				) : (
					<div className="w-full h-full flex flex-col justify-center items-center text-muted-foreground">
						<Inbox strokeWidth={1} className="h-12 w-12" />
						<p>Cart is empty</p>
					</div>
				)}
			</div>
		</Drawer>
	)
}
