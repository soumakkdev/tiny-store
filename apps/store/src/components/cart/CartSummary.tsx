import React from 'react'
import useCart from './useCart'
import { formatCurrency } from '@/lib/helpers'
import { Separator } from '@tiny/ui'

export default function CartSummary() {
	const { summary } = useCart()

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<p>Sub Total</p>
				<p>{formatCurrency(summary.subtotal)}</p>
			</div>
			<div className="flex items-center justify-between text-sm">
				<p>Delivery</p>
				<p>{formatCurrency(summary.deliveryCharge)}</p>
			</div>
			<Separator />
			<div className="flex items-center justify-between">
				<p>Total</p>
				<p className="font-semibold">{formatCurrency(summary.total)}</p>
			</div>
		</div>
	)
}
